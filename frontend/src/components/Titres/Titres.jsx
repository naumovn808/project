import React from 'react'
import styles from './Titres.module.css'

function Titres() {
	return (
		<div className={styles.titers}>
			<div className={styles.title}>
				<h1>
					проект <span className={styles.partyshaker}>Partyshaker</span>
				</h1>
				<span className={styles.underline}></span>
			</div>

			<div className={styles.scrollbar}>
				<ul className={styles.wrapper}>
					<li className={styles.roll}>
						<div className={styles.topic}>Дизайнеры</div>
						<ul className={styles.roll_content}>
							<li>Юрий Костылев</li>
							<li>Сергей Оршак</li>
							<li>Майя Ковалёва</li>
							<li>Лиза</li>
							<li>Катя</li>
							<li>Марина Дунина</li>
							<li>Гюзель Зарипова</li>
							<li>Вита Быкова</li>
							<li>Автандил Ефимов</li>
						</ul>
					</li>
					<li className={styles.roll}>
						<div className={styles.topic}>Бизнес-аналитик</div>
						<ul className={styles.roll_content}>
							<li>Михаил Ивчик</li>
						</ul>
					</li>
				</ul>
			</div>
			{/* <div className={styles.roll}>
				<ul className={styles.list}>
					<p></p>
					<ul className={styles.list_content}>
					
					</ul>
				</ul>
			</div> */}
		</div>
	)
}

export default Titres
