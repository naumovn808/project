import styles from './ProductCardOpen.module.css';



function ProductCartOpen({ }) {

    return (
        <>
            <div className={styles['container']}>


                <div className={styles['containerLeft']}>
                    <div>
                        < div className={styles['imgs']}>
                <img src="./cartImg1.png" alt="" className={styles['img']} />
                            <img src="./cartImg1.png" alt="" className={styles['img']} />
                            <img src="./cartImg1.png" alt="" className={styles['img']} />
                            <img src="./cartImg1.png" alt="" className={styles['img']} />
                            <img src="./cartImg1.png" alt="" className={styles['img']} />
                          
                        </div>
                        <div > <img src="./cartImg1.png" alt="" className={styles['mainImg']}/> </div>
                        
                      
                        
                    </div>
                      <button className={styles['buttonAdd']}> <img src="./icons/iconBtn.svg" alt="" />Добавить в сохраненное</button>
                    <button className={styles['buttonShare']}> Поделиться</button>

                    </div> 
                <div className={styles['containerRight']}></div>
                




{/* 

                <button className={styles['frame-button']}> <img src="./icons/iconBtn.svg" alt="" /></button>


                <div className={styles['bottom']}>
                    <div className={styles['bottom-frame']}>
                        <h3 className={styles['bottom-title']} >Апероллини</h3>

                        <p className={styles['bottom-text']}> Сладкий</p>
                        <div className={styles['bottom-icons']} >
                            <div className={styles['bottom-icon']} >
                                <img src="./icons/semiAlcogol.svg" alt="" />
                                <img src="./icons/iconShort.svg" alt="" />
                                <img src="./icons/mediumDift.svg" alt="" />
                            </div>
                            <div className={styles['bottom-reiting']}>
                                <span>4.2</span>
                                <img width='12px' height='12px' src="./icons/iconStar.svg" alt="" />
                            </div>
                        </div>
                    </div>
                </div> */}


            </div>

        </>
    )
}

export default ProductCartOpen; 