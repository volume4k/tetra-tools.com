export type Route = 'home' | 'product' | 'impressum';

interface RouteState {
    route: Route;
    param?: string;
}

type RouteHandler = (state: RouteState) => void;

let handler: RouteHandler | null = null;

/** Parse hash into route state */
function parseHash(): RouteState {
    const hash = window.location.hash.slice(1) || '';
    if (hash.startsWith('product/')) {
        return { route: 'product', param: hash.replace('product/', '') };
    }
    if (hash === 'impressum') {
        return { route: 'impressum' };
    }
    return { route: 'home' };
}

/** Navigate to a route */
export function navigate(path: string): void {
    window.location.hash = path;
}

/** Set up router with handler */
export function initRouter(fn: RouteHandler): void {
    handler = fn;
    window.addEventListener('hashchange', () => {
        const state = parseHash();
        handler?.(state);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    // Initial route
    handler(parseHash());
}

export function getCurrentRoute(): RouteState {
    return parseHash();
}
