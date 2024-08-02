import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Hero {
	id: number;
	name: string;
}

const Heroes: React.FC = () => {
	const [heroes, setHeroes] = useState<Hero[]>([]);

	useEffect(() => {
		// Simulating fetch from an API
		setHeroes([
			{ id: 1, name: "Ironman" },
			{ id: 2, name: "Spiderman" },
			{ id: 3, name: "Luke skywalker" },
		]);
	}, []);

	return (
		<div>
			<h2>Heroes</h2>
			<ul>
				{heroes.map((hero) => (
					<li key={hero.id}>
						<Link to={`/edit/${hero.id}`}>{hero.name}</Link>
					</li>
				))}
			</ul>
			<h1>hello world</h1>
		</div>
	);
};

export default Heroes;
