<script lang="ts">
	import Navbar from "./lib/navbar/Navbar.svelte";
	import Editor from "./lib/editor/Editor.svelte";

	import revealCSS from "./styles/reveal.css?url";
	import bloodCSS from "./styles/blood.css?url";
	import whiteCSS from "./styles/white.css?url";
	import customCSS from "./styles/custom-styles.css?url";

	import bundle from 'icp-bundle/dist/base/full.iife.js?url';
    import Overview from "./lib/modals/Overview.svelte";
	import Help from "./lib/modals/Help.svelte";
    import Export from "./lib/modals/Export.svelte";

	import { darkTheme } from "./stores";
    import SelfHosting from "./lib/modals/SelfHosting.svelte";
    import Exporting from "./lib/modals/Exporting.svelte";

	$: dark = $darkTheme

	$: {
		const themeElement = document.getElementById("theme");
		if (themeElement) {
			themeElement.setAttribute("href", $darkTheme ? bloodCSS : whiteCSS);
		}
	}
</script>

<main class="w-full h-full transition-colors duration-300" class:dark>
	<div class="flex flex-col w-full h-full bg-primary  text-white">
		<Navbar />
		<Editor />
		<Overview />
		<Help />
		<Export />
		<Exporting />
		<SelfHosting />
	</div>
</main>

<svelte:head>
	<!-- Main Reveal Stylesheet -->
	<link rel="stylesheet" href="{revealCSS}">

	<!-- Reveal Custom Theme -->
	<link rel="stylesheet" href="{bloodCSS}" id="theme">

	<!-- ICP bundle loaded from node_modules -->
	<script src="{bundle}"></script>

	<!-- Custom stylesheet to make reveal work with our playgrounds -->
	<link rel="stylesheet" href="{customCSS}" />

	<style>
		@import url(https://fonts.googleapis.com/css?family=Roboto:400,400italic,500,500otaòoc,600,600italic,700,700italic);
		html,
		body {
			margin: 0;
			padding: 0;
			height: 100vh;
			width: 100vw;
		}

		body * {
			text-shadow: none !important;
		}
	
		[contenteditable="true"].editable:active,
		[contenteditable="true"].editable:focus {
			border: none;
			outline: none;
			display: block;
			font-family: courier, monospace;
			border: 1px solid #b1b3bd;
		}

		::-webkit-scrollbar-track {
			box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
			-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
			background-color: #f5f5f5;
		}

		::-webkit-scrollbar {
			width: 7px;
			height: 7px;
			background-color: #f5f5f5;
		}

		::-webkit-scrollbar-thumb {
			background-color: #c3073f;
		}
	</style>
</svelte:head>
