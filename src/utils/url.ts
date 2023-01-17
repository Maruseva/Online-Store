export function changeUrl(name: string, value: string): void {
    const url = new URL(window.location.href);
    url.searchParams.set(name, value);
    history.pushState('', '', url);
    window.dispatchEvent(new Event('pushstate'));
}
