export function SaluteWithTs({ name, age }: { name: string; age: number }) {
	return (
		<div>
			<p>
				Hola soy {name} y tengo {age} años
			</p>
			<p>Esto es un componente que usa Prop Types. Mira la consola para ver los errores</p>
		</div>
	);
}
