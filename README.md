# @marianmeres/boolean-store

Simple DRY [store](https://github.com/marianmeres/store) utility for keeping boolean flag along with optional payload.

## Install

```shell
$ npm i @marianmeres/boolean-store
```

## Basic example

```javascript
const sidebar = createBooleanStore(false, { component: Foo });
```

Using Svelte here as an example of consuming the store, but the store itself
is not dependant on Svelte (just compatible).

```sveltehtml
{#if $sidebar.isOpen}
    <Sidebar>
        <svelte:component this={$sidebar.payload.component} />
    </Sidebar>
{/if}

<button on:click={sidebar.toggle}>Toggle Foo sidebar</button>

<button on:click={() => sidebar.open({ component: Bar })}>
    Bar sidebar
</button>
```
