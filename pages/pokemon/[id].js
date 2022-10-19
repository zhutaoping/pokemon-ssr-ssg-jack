/* eslint-disable @next/next/no-img-element */
// import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
// import { useEffect, useState } from "react";

import styles from "../../styles/Details.module.css";

export const getStaticPaths = async () => {
	const res = await fetch("https://pokeapi.co/api/v2/pokemon/");
	const data = await res.json();

	const pokemonData = await Promise.all(
		data.results.map(async (da) => {
			const res2 = await fetch(da.url);
			const data2 = await res2.json();
			return data2;
		})
	);

	return {
		paths: pokemonData.map((pokemon) => ({
			params: {
				id: pokemon.id.toString(),
			},
		})),
		fallback: false,
	};
};

export const getStaticProps = async ({ params }) => {
	const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);

	return {
		props: {
			pokemon: await res.json(),
		},
	};
};

const Details = ({ pokemon }) => {
	// const {
	// 	query: { id },
	// } = useRouter();

	// const [pokemon, setPokemon] = useState(null);

	// useEffect(() => {
	// 	async function getPokemon() {
	// 		const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
	// 		const data = await res.json();
	// 		setPokemon(data);
	// 	}
	// 	if (id) getPokemon();
	// }, [id]);

	// if (!pokemon) {
	// 	return null;
	// 	s;
	// }

	return (
		<div>
			<Head>
				<title>{pokemon.name}</title>
			</Head>
			<div>
				<Link href="/">
					<a>Back to Home</a>
				</Link>
			</div>
			<div className={styles.layout}>
				<div>
					<img
						className={styles.picture}
						src={pokemon.sprites.other["official-artwork"].front_default}
						alt={pokemon.name.english}
					/>
				</div>
				<div>
					<div className={styles.name}>{pokemon.name}</div>
					<div className={styles.type}>
						{pokemon.types.map((type) => type.type.name).join(", ")}
					</div>
					<table>
						<thead className={styles.heading}>
							<tr>
								<th>Name</th>
								<th>Value</th>
							</tr>
						</thead>
						<tbody>
							{pokemon.stats.map((st) => (
								<tr key={st.stat.name}>
									<td className={styles.attribute}>{st.stat.name}</td>
									<td>{st.base_stat}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};
export default Details;
