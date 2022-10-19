<script lang="ts">
	import Navbar from "./lib/navbar/Navbar.svelte";
	import Editor from "./lib/editor/Editor.svelte";
</script>

<main class="flex flex-col w-full h-full bg-[#1a1a1d] text-white">
	<Navbar />
	<Editor />
</main>

<svelte:head>
	<!-- Main Reveal Stylesheet -->
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/reveal.js@4.1.0/dist/reveal.css"
	/>
	<!-- <link rel="stylesheet" href="reveal.css"> -->

	<!-- Blood Reveal Theme Stylesheet -->
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/reveal.js@4.1.0/dist/theme/blood.css"
		id="theme"
	/>

	<!-- <link rel="stylesheet" href="blood.css"> -->

	<script src="https://unpkg.com/icp-bundle@0.1.1/dist/base/full.iife.js"></script>
	
		<!-- <script src="icp-bundle.umd.js"></script> -->

	<!-- Custom stylesheet to make reveal work with our playgrounds -->
	<link rel="stylesheet" href="custom-styles.css" />

	<style>
		@import url(https://fonts.googleapis.com/css?family=Roboto:400,400italic,500,500otaòoc,600,600italic,700,700italic);
		html,
		body {
			margin: 0;
			padding: 0;
			height: 100vh;
			width: 100vw;
		}

		[contenteditable="true"].editable:active,
		[contenteditable="true"].editable:focus {
			border: none;
			outline: none;
			display: block;
			color: white;
			font-family: courier, monospace;
			background: #424242;
			border: 1px solid #999;
		}

		::-webkit-scrollbar-track {
			box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
			-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
			background-color: #f5f5f5;
		}

		::-webkit-scrollbar {
			width: 10px;
			background-color: #f5f5f5;
		}

		::-webkit-scrollbar-thumb {
			background-color: #c3073f;
		}
	</style>
</svelte:head>
