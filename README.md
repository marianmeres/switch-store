# @marianmeres/switch-store

Simple DRY [store](https://github.com/marianmeres/store) utility for a boolean flag along with optional data.

## Install

```shell
$ npm i @marianmeres/switch-store
```

## Basic example

```javascript
const sidebar = createSwitchStore(false, { component: Foo } /* whatever */);

// "open", "close" are aliases to "on" and "off"

sidebar.subscribe((value) => {
	// value -> {
	//     isOn: false,
	//     isOff: true,
	//     isOpen: false,
	//     isClosed: true,
	//     data: { component: Foo }
	// }
});

// api
store.subscribe((value) => ...)
store.on(data?); // or open
store.off(data?); // or close
store.toggle();

```

Using Svelte here as an example of consuming the store. The store itself
is not dependant on Svelte (just compatible).

```sveltehtml
{#if $sidebar.isOpen}
    <Sidebar>
        <svelte:component this={$sidebar.data.component} />
    </Sidebar>
{/if}

<button on:click={sidebar.toggle}>Toggle Foo sidebar</button>

<button on:click={() => sidebar.open({ component: Bar })}>
    Bar sidebar
</button>
```
