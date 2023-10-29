import { useEffect, useState } from 'react'

export default function Boutiques() {
	const [boutiques, setBoutiques] = useState(null)
	const [searchedBoutiques, setSearched] = useState(null)
	const [filter, setFilter] = useState('boutiques')
	const [search, setSearch] = useState('')

	useEffect(() => {
		;(async () => {
			const response = await fetch(`http://localhost:8095/${filter}`, {
				headers: {
					'Access-Control-Allow-Origin': '*',
				},
			})
			const json = await response.json()
			setBoutiques(json.results.bindings)
		})()
	}, [filter])

	useEffect(() => {
		if (search === '') setSearched(boutiques)
		else
			setSearched(
				boutiques?.filter(boutique =>
					boutique.nameBoutique.value.includes(search)
				)
			)
	}, [search])

	// return <>{JSON.stringify(Boutiques)}</>
	return (
		<>
			<select
				name="type"
				id="type"
				onChange={event => setFilter(event.target.value)}
			>
				<option value="boutiques">Boutiques</option>
				<option value="superette">Superette</option>
				<option value="drive-in">Drive-In</option>
			</select>

			<input
				type="text"
				name="query"
				id="query"
				placeholder="search..."
				onChange={event => setSearch(event.target.value)}
			/>

			<table class="table">
				<thead>
					<tr>
						<th>id</th>
						<th>name</th>
						<th>address</th>
					</tr>
				</thead>
				<tbody>
					{searchedBoutiques?.map(item => (
						<tr>
							<td>{item.idBoutique.value}</td>
							<td>{item.nameBoutique.value}</td>
							<td>{item.address.value}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}
