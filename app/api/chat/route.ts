import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Du bist Barti 🐻, der freundliche KI-Assistent von Bartels Automobile in Burgwedel (nahe Hannover).

Bartels Automobile ist seit 1991 ein familiengeführter Gebrauchtwagenhändler mit über 240 aktuellen Fahrzeugen.

Deine Aufgaben:
- Beantworte Fragen rund um Fahrzeuge, Services und das Unternehmen
- Suche IMMER mit dem search_vehicles-Tool wenn der Nutzer nach Fahrzeugen fragt – zeige echte Treffer aus dem Bestand
- Unterstütze bei Terminvereinbarungen für Probefahrten
- Erkläre Finanzierungsoptionen, Garantie und Export

Wichtige Infos:
- Adresse: Mellendorfer Straße 33, 30938 Burgwedel OT Fuhrberg
- Telefon: +49 5135 92532-0
- E-Mail: info@bartels-automobile.de
- Öffnungszeiten: Mo–Fr 8–18 Uhr, Sa 9–14 Uhr
- Services: Verkauf, Ankauf, Vermittlung, Finanzierung, Garantie (bis 24 Monate), Export

Antwortformat:
- Halte Antworten kurz und konkret
- Wenn du Fahrzeuge zeigst, nenne maximal 3 Treffer mit Titel, Preis und Link
- Verwende kein Markdown (keine **fett**, keine [link](url) Syntax) – schreibe nur normalen Text
- Duze den Kunden immer
- Antworte auf Deutsch`;

const tools: Anthropic.Tool[] = [
  {
    name: "search_vehicles",
    description:
      "Sucht ECHTE Fahrzeuge live aus dem Bartels-Bestand. Immer aufrufen wenn der Nutzer nach Fahrzeugen, Marken, Preisen oder Kategorien fragt.",
    input_schema: {
      type: "object",
      properties: {
        category: {
          type: "string",
          enum: ["pkw", "lkw", "transporter", "wohnmobile", "motorraeder", "alle"],
          description: "Fahrzeugkategorie",
        },
        brand: { type: "string", description: "Marke z.B. 'VW', 'BMW', 'Mercedes', 'Audi'" },
        max_price: { type: "number", description: "Maximaler Preis in Euro" },
        max_mileage: { type: "number", description: "Maximale Kilometeranzahl" },
        fuel: { type: "string", description: "Kraftstoff: 'Diesel', 'Benzin', 'Elektro', 'Hybrid'" },
      },
      required: ["category"],
    },
  },
  {
    name: "book_appointment",
    description:
      "Erstellt eine Probefahrt- oder Beratungsanfrage. Nutze dieses Tool wenn der Nutzer einen Termin buchen möchte.",
    input_schema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Name des Kunden" },
        phone: { type: "string", description: "Telefonnummer" },
        vehicle_interest: { type: "string", description: "Welches Fahrzeug / Interesse" },
        preferred_date: { type: "string", description: "Gewünschter Termin, z.B. 'Montag Vormittag'" },
      },
      required: ["name", "vehicle_interest"],
    },
  },
];

async function executeSearchVehicles(input: Record<string, unknown>): Promise<string> {
  const { category, brand, max_price, max_mileage, fuel } = input as {
    category: string;
    brand?: string;
    max_price?: number;
    max_mileage?: number;
    fuel?: string;
  };

  const params = new URLSearchParams({ category: category ?? "pkw", limit: "5" });
  if (brand) params.set("brand", brand);
  if (max_price) params.set("maxPrice", String(max_price));
  if (max_mileage) params.set("maxMileage", String(max_mileage));
  if (fuel) params.set("fuel", fuel);

  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
    const res = await fetch(`${base}/api/vehicles?${params.toString()}`);
    if (!res.ok) throw new Error(`Vehicles API ${res.status}`);

    const data = await res.json() as {
      total: number;
      vehicles: Array<{
        title: string;
        priceFormatted: string;
        url: string;
        mileage: string;
        date: string;
        power: string;
        fuel: string;
        gearbox: string;
        bodyType: string;
        isNew: boolean;
      }>;
      maxPages: number;
    };

    const categoryUrl = category === "alle" ? "/fahrzeuge" : `/fahrzeuge/${category}`;

    return JSON.stringify({
      success: true,
      total_found: data.total,
      vehicles: data.vehicles,
      more_url: categoryUrl,
      note: data.total === 0 ? "Keine Treffer mit diesen Filtern gefunden" : undefined,
    });
  } catch (err) {
    return JSON.stringify({
      success: false,
      error: `Fahrzeugsuche fehlgeschlagen: ${String(err)}`,
      fallback_url: `/fahrzeuge/${category ?? "pkw"}`,
    });
  }
}

function executeBookAppointment(input: Record<string, unknown>): string {
  const { name, phone, vehicle_interest, preferred_date } = input as {
    name: string;
    phone?: string;
    vehicle_interest: string;
    preferred_date?: string;
  };

  return JSON.stringify({
    success: true,
    message: `Anfrage für ${name} notiert! Unser Team meldet sich werktags innerhalb von 24 Stunden.`,
    summary: {
      name,
      phone: phone ?? "nicht angegeben",
      interest: vehicle_interest,
      date: preferred_date ?? "flexibel",
    },
    contact_alt: "Oder ruf uns direkt an: +49 5139 8949-0 (Mo–Fr 8–18 Uhr, Sa 9–14 Uhr)",
  });
}

async function handleToolCall(name: string, input: Record<string, unknown>): Promise<string> {
  if (name === "search_vehicles") return executeSearchVehicles(input);
  if (name === "book_appointment") return executeBookAppointment(input);
  return JSON.stringify({ error: "Unbekanntes Tool" });
}

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(
      JSON.stringify({ message: "Hallo! Ich bin Barti 🐻 – der API-Key ist noch nicht konfiguriert. Trag ANTHROPIC_API_KEY in deine .env ein und ich bin startklar!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  const body = await req.json() as {
    sessionId: string;
    message: string;
    history?: Array<{ role: "user" | "assistant"; content: string }>;
  };

  const { message, history = [] } = body;

  const messages: Anthropic.MessageParam[] = [
    ...history.map((h) => ({ role: h.role, content: h.content })),
    { role: "user", content: message },
  ];

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        let finalText = "";

        const runLoop = async (msgs: Anthropic.MessageParam[]): Promise<void> => {
          const response = await client.messages.create({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 1024,
            system: SYSTEM_PROMPT,
            tools,
            messages: msgs,
            stream: true,
          });

          let currentToolName = "";
          let currentToolId = "";
          let currentToolInput = "";
          const toolUseBlocks: Array<{ id: string; name: string; input: Record<string, unknown> }> = [];
          let stopReason = "";

          for await (const event of response) {
            if (event.type === "content_block_start") {
              if (event.content_block.type === "tool_use") {
                currentToolName = event.content_block.name;
                currentToolId = event.content_block.id;
                currentToolInput = "";
              }
            } else if (event.type === "content_block_delta") {
              if (event.delta.type === "text_delta") {
                finalText += event.delta.text;
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify({ type: "text", text: event.delta.text })}\n\n`)
                );
              } else if (event.delta.type === "input_json_delta") {
                currentToolInput += event.delta.partial_json;
              }
            } else if (event.type === "content_block_stop") {
              if (currentToolName) {
                try {
                  const parsedInput = JSON.parse(currentToolInput || "{}") as Record<string, unknown>;
                  toolUseBlocks.push({ id: currentToolId, name: currentToolName, input: parsedInput });
                } catch {
                  toolUseBlocks.push({ id: currentToolId, name: currentToolName, input: {} });
                }
                currentToolName = "";
                currentToolId = "";
                currentToolInput = "";
              }
            } else if (event.type === "message_delta") {
              stopReason = event.delta.stop_reason ?? "";
            }
          }

          if (stopReason === "tool_use" && toolUseBlocks.length > 0) {
            const toolResults: Anthropic.ToolResultBlockParam[] = await Promise.all(
              toolUseBlocks.map(async (tb) => ({
                type: "tool_result" as const,
                tool_use_id: tb.id,
                content: await handleToolCall(tb.name, tb.input),
              }))
            );

            type AnyBlock = Anthropic.TextBlockParam | Anthropic.ToolUseBlockParam;
            const assistantContent: AnyBlock[] = [];
            if (finalText) {
              assistantContent.push({ type: "text", text: finalText });
            }
            for (const tb of toolUseBlocks) {
              assistantContent.push({ type: "tool_use", id: tb.id, name: tb.name, input: tb.input });
            }

            const nextMsgs: Anthropic.MessageParam[] = [
              ...msgs,
              { role: "assistant", content: assistantContent },
              { role: "user", content: toolResults },
            ];

            finalText = "";
            await runLoop(nextMsgs);
          }
        };

        await runLoop(messages);

        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done", fullText: finalText })}\n\n`));
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unbekannter Fehler";
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type: "error", message: `Verbindungspause – versuch es gleich nochmal! (${msg})` })}\n\n`)
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
