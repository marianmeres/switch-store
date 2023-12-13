# @marianmeres/switch-store

Simple DRY [store](https://github.com/marianmeres/store) utility for keeping boolean flag along with optional payload.

## Install

```shell
$ npm i @marianmeres/Simple utility for keeping boolean flag along with optional payload.-store
```

## Basic example

```javascript
const sidebar = createBooleanStore<{ component: any }>(false, { component: Foo });

// "open", "close" are aliases to "on" and "off"

sidebar.subscribe((value) => {
	// value -> {
	//     isOn: false,
	//     isOff: true,
	//     isOpen: false,
	//     isClosed: true,
	//     payload: { component: Foo }
	// }
});

// api
store.subscribe((value) => ...)
store.on(payload?); // or open
store.off(payload?); // or close
store.toggle();

```

Using Svelte here as an example of consuming the store. The store itself
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
