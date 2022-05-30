<script lang="ts">
	import Navbar from "./components/Navbar/Navbar.svelte";
	import Editor from "./components/editor/Editor.svelte";
</script>

<main>
	<Navbar />
	<Editor />
</main>

<svelte:head>
	<!-- Main Reveal Stylesheet -->
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/reveal.js@4.1.0/dist/reveal.css"
	/>

	<!-- Blood Reveal Theme Stylesheet -->
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/reveal.js@4.1.0/dist/theme/blood.css"
		id="theme"
	/>

	<script
		src="https://unpkg.com/icp-bundle@0.0.6/dist/base/icp-bundle.umd.js"></script>

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

		[contenteditable="true"]:active,
		[contenteditable="true"]:focus {
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

	<!-- Import the main reveal script -->
	<!-- <script src=" https://cdn.jsdelivr.net/npm/reveal.js@4.1.0/dist/reveal.js">
	</script> -->
</svelte:head>

<style>
	main {
		width: 100%;
		height: 100%;
		font-family: "Roboto", sans-serif;
		background: #1a1a1d;
		color: white;
	}
</style>
