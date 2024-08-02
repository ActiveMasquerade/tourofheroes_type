import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Hero {
	id: number;
	name: string;
}

const EditHero: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [hero, setHero] = useState<Hero>({ id: 0, name: "" });

	useEffect(() => {
		// Simulating fetch from an API
		const fetchedHero = { id: parseInt(id || "0"), name: `Hero ${id}` };
		setHero(fetchedHero);
	}, [id]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setHero({ ...hero, name: e.target.value });
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		// Simulate saving data
		console.log("Saved hero:", hero);
		navigate("/heroes");
	};

	return (
		<div>
			<h2>Edit Hero</h2>
			<form onSubmit={handleSubmit}>
				<label>
					Name:
					<input type="text" value={hero.name} onChange={handleChange} />
				</label>
				<button type="submit">Save</button>
			</form>
		</div>
	);
};

export default EditHero;
