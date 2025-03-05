export async function humanizeText(text: string): Promise<string> {
  try {
    const response = await fetch("/api/humanize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to humanize text");
    }

    return data.result;
  } catch (error: any) {
    console.error("Error humanizing text:", error);
    throw new Error(error.message || "Failed to humanize text");
  }
}
