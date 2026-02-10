    export function generateTimestamp(): string {
    return Date.now().toString();
    }

    export function replaceTimestamp(text: string): string {
    return text.replace(/\{\{timestamp\}\}/g, generateTimestamp());
    }
