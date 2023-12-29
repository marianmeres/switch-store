# @marianmeres/switch-store

Tiny DRY [store](https://github.com/marianmeres/store) utility for a 3 state
flag (`true`, `false` and `undefined`) along with arbitrary data.

You can distinguish between falsey `false` and `undefined` states if you need to by checking
explicitly the `isUndefined` store prop. The `undefined` state is otherwise always evaluated as
`isOff` switch state.

## Install

```shell
$ npm i @marianmeres/switch-store
```

## Basic example

```javascript
const sidebar = createSwitchStore(false, { component: Foo } /* whatever */);

// "open" and "close" are aliases to "on" and "off"

sidebar.subscribe((value) => {
	// value -> {
	//     isOn: false,
	//     isOff: true,
	//     isUndefined: false,
	//     isOpen: false,
	//     isClosed: true,
	//     data: { component: Foo }
	// }
});

// api
store.subscribe((value) => ...)
store.on(data?); // or open
store.off(data?); // or close
store.unset(); // will set the internal flag to `undefined`
store.toggle();

```

Using Svelte here just as an example of consuming the store. The store itself
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
