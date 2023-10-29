import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
const Chaud = () => {
	const [Chaud, setChaud] = useState(null)
	const [Animal, setAnimal] = useState(null)
	const [Liquide, setLiquide] = useState(null)

	async function fetchData() {
		console.log('aaaaaaa')

		axios
			.get(`http://localhost:8095/livreur`, {
				headers: { 'Access-Control-Allow-Origin': '*' },
			})
			.then(res => {
				console.log(res.data.results.bindings)
				setChaud(res.data.results.bindings)
			})

		axios
			.get(`http://localhost:8095/moyentransport/voiture`, {
				headers: { 'Access-Control-Allow-Origin': '*' },
			})
			.then(res => {
				console.log(res.data.results.bindings)
				setAnimal(res.data.results.bindings)
			})

		axios
			.get(`http://localhost:8095/moyentransport/moto`, {
				headers: { 'Access-Control-Allow-Origin': '*' },
			})
			.then(res => {
				console.log(res.data.results.bindings)
				setLiquide(res.data.results.bindings)
				console.log(
					'items in liquide',

					Liquide?.map(item => {
						return item.moto_type.value
					})
				)
			})
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<div>
			<div class="col-lg-12 grid-margin stretch-card">
				<div class="card">
					<div class="card-body">
						<h4 class="card-title">Les Livreurs</h4>
						<div class="table-responsive">
							<table class="table">
								<thead>
									<tr>
										<th>Name</th>
										<th>phone number</th>
										<th>véhicule</th>
									</tr>
								</thead>
								<tbody>
									{Chaud?.map(item => (
										<tr>
											<td>{item.username.value}</td>
											<td>{item.phone_number.value}</td>
											<td>
												{Animal?.map(item => (
													<>
														{
															item.voiture_type
																.value
														}
													</>
												))}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Chaud
