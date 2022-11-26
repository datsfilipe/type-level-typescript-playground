# Type Level Typescript

Learning more of typescript with [type level typescript](https://type-level-typescript.com) lessons.

## Lessons

### 1. Generics

Use case: when I don't know the type in advance.

```typescript
namespace challenge {
  type GetAllKeys<obj> = keyof obj;

  GetAllKeys<{ name: string; age: number }>; // "name" | "age"
}
```
