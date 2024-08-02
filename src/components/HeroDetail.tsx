import { useState, useEffect, ChangeEvent } from "react";
import { useParams } from "react-router-dom";

interface Hero {
	id: number;
	name: string;
}

const HeroDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [hero, setHero] = useState<Hero | null>(null);

	useEffect(() => {
		fetch("/heroes.json")
			.then((response) => response.json())
			.then((data: Hero[]) => {
				const foundHero = data.find((hero) => hero.id === parseInt(id || "0", 10));
				setHero(foundHero || null);
			})
			.catch((error) => console.error("Error fetching hero:", error));
	}, [id]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setHero((prevHero) => (prevHero ? { ...prevHero, [name]: value } : null));
	};

	const handleSave = () => {
		fetch("/heroes.json", {
			method: "POST", // or 'PUT'
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(hero),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Success:", data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	if (!hero) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h2>{hero.name} Details</h2>
			<div>
				<label>
					Hero name:
					<input name="name" value={hero.name} onChange={handleChange} />
				</label>
			</div>
			<button onClick={handleSave}>Save</button>
		</div>
	);
};

export default HeroDetail;
