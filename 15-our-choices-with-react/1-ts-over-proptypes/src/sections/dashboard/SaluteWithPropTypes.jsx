import PropTypes from "prop-types";

export function SaluteWithPropTypes({ name, age }) {
	return (
		<div>
			<p>
				Hola soy {name} y tengo {age} años
			</p>
			<p>Esto es un componente que usa Prop Types. Mira la consola para ver los errores</p>
		</div>
	);
}

SaluteWithPropTypes.propTypes = {
	name: PropTypes.string.isRequired,
	age: PropTypes.number,
};
