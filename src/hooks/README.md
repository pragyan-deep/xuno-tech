# Hooks Directory

This directory contains custom React hooks for shared functionality.

## Naming Convention

- Prefix all hooks with `use` (e.g., `useTheme.ts`)
- Use camelCase for hook files

## Common Hooks

- **`useTheme.ts`** - Theme management (light/dark mode)
- **`useScrollPosition.ts`** - Track scroll position for animations
- **`useIntersectionObserver.ts`** - Detect when elements enter viewport
- **`useLocalStorage.ts`** - Persistent local storage state

## Usage

```typescript
import { useTheme } from '@/hooks/useTheme'

const { theme, toggleTheme } = useTheme()
``` 