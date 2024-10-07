export class NextRequest {
  url: string;
  method: string;

  constructor(input: string | URL, init?: { method?: string }) {
    this.url = input.toString();
    this.method = init?.method || "GET";
  }
}

export class NextResponse {
  static json(body: unknown, init?: ResponseInit) {
    return {
      ...init,
      json: async () => body,
      status: init?.status || 200,
    };
  }
}
