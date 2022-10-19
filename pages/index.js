/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export const getServerSideProps = async () => {
	const res = await fetch("https://pokeapi.co/api/v2/pokemon/");
	const data = await res.json();

	const pokemonData = await Promise.all(
		data.results.map(async (da) => {
			const res2 = await fetch(da.url);
			// console.log(res2);
			const data2 = await res2.json();
			// console.log(data2);
			return data2;
		})
	);

	return {
		props: {
			pokemon: pokemonData,
		},
	};
};

export default function Home({ pokemon }) {
	// const [pokemon, setPokemon] = useState([]);

	// useEffect(() => {
	// 	async function getPokemon() {
	// 		const res = await fetch("https://pokeapi.co/api/v2/pokemon/");
	// 		const data = await res.json();

	// 		const pokemonData = await Promise.all(
	// 			data.results.map(async (da) => {
	// 				const res2 = await fetch(da.url);
	// 				// console.log(res2);
	// 				const data2 = await res2.json();
	// 				// console.log(data2);
	// 				return data2;
	// 			})
	// 		);
	// 		// console.log(pokemonData);
	// 		setPokemon(pokemonData);
	// 	}
	// 	getPokemon();
	// }, []);

	return (
		<div>
			<Head>
				<title>Pokemon List</title>
			</Head>
			<h2>Pokemon List 2</h2>
			<div className={styles.grid}>
				{pokemon.map((pokemon) => (
					<div className={styles.card} key={pokemon.id}>
						<Link href={`/pokemon/${pokemon.id}`}>
							<a>
								<img
									src={pokemon.sprites.other["official-artwork"].front_default}
									alt={pokemon.name}
								/>
								<h2 className={styles.name}>{pokemon.name}</h2>
							</a>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}
