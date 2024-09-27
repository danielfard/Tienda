<script lang="ts">
	import "../app.css";
	export { load } from "sveltekit-flash-message/server";
</script>

<div>
	<div class="navbar bg-base-100 bg-slate-950">
		<div class="flex-1">
			<a class="btn btn-ghost text-xl text-white">Tienda</a>
		</div>
		<div class="flex-none text-white">
			<ul class="menu menu-horizontal px-1">
				<li><a href="/product">Productos</a></li>
				<li><a>Ordenes</a></li>
			</ul>
		</div>
	</div>

	<main class="max-w-4xl mx-auto m-4">
		<slot />
	</main>
</div>
