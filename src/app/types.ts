export interface GenerateCopyResponse {
  data: string | null;
}

export interface GenerateCopyRequestPayload {
  prompt: string;
  tone: string;
}

export interface OptionType {
  label: string;
  value: string;
}
