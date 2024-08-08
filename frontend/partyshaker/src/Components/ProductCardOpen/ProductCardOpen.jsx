import styles from './ProductCardOpen.module.css';
import { useState } from 'react';
import  CardSlider  from '../CardSlider/CardSlider';
import ThumbnailSlider from '../TrumbnailSlider/TrumbnailSlider';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



function ProductCartOpen() {
     
  
    const cards = [
        { id: 1, image: './cartImg1.png', title: 'Card 1' },
        { id: 2, image: './cartImg2.png', title: 'Card 2' },
        { id: 3, image: './cartImg3.png', title: 'Card 3' },
        { id: 4, image: './cartImg4.png', title: 'Card 4' },
        { id: 5, image: './cartImg5.png', title: 'Card 5' },

    ];

    const ingredients = [
        { id: 1, mark: './icons/IconEmpty.PNG', name: 'Белый ром', qty: '30 мл'  },
        { id: 2, mark: './icons/IconMark.svg', name: 'Водка', qty: '30 мл' },
        { id: 3, mark: './icons/IconEmpty.PNG', name: 'Серебряная текила', qty: '30 мл' },
        { id: 4, mark: './icons/IconEmpty.PNG', name: 'Сухой джин', qty: '30 мл' },
        { id: 4, mark: './icons/IconEmpty.PNG', name: 'Трипл сек', qty: '30 мл' },
        { id: 4, mark: './icons/IconMark.svg', name: 'Сахарный сироп', qty: '30 мл' },
        { id: 4, mark: './icons/IconMark.svg', name: 'Лимонный сок', qty: '30 мл' },
        { id: 4, mark: './icons/IconMark.svg', name: 'Кола', qty: '100 мл' },
        { id: 4, mark: './icons/IconMark.svg', name: 'Лимон', qty: '40 г' },
        { id: 4, mark: './icons/IconMark.svg', name: 'Лед в кубиках', qty: '300 г' },
    ] 
    const equipments = [
        { id: 1, mark: './icons/IconMark.svg', name: 'Хайбол', qty: '1 шт' },
        { id: 2, mark: './icons/IconEmpty.PNG', name: 'Джиггер', qty: '1 шт' },
        { id: 3, mark: './icons/IconMark.svg', name: 'Коктейльная ложка', qty: '1 шт' },
        { id: 4, mark: './icons/IconEmpty.PNG', name: 'Пресс для цитрусовых', qty: '1 шт' },
        { id: 5, mark: './icons/IconMark.svg', name: 'Трубочки', qty: '1 шт' },

    ]
    const recipes = [
        { id: 1, description: 'В шейкере со льдом соедините светлый ром, водку, текилу, джин, ликер, лимонный сок и сахарный сироп.'},
        { id: 2, description: 'Хорошо взболтайте все ингредиенты, чтобы они смешались.' },
        { id: 3, description: 'Наполните льдом высокий стакан или коллинз с прозрачными стенками.' },
        { id: 4, description: 'Процедите коктейль из шейкера в стакан через стрейнер, чтобы отделить лед, или просто растолките содержимое шейкера в стакан со льдом.' },
        { id: 5, description: 'Долейте колу в стакан до верха, оставив место для перемешивания.' },
        { id: 6, description: 'Перемешайте содержимое стакана для равномерного распределения и смешивания ингредиентов.' },
        { id: 7, description: 'Украсьте коктейль ломтиком лимона.' },


    ]

  const [selectedCard, setSelectedCard] = useState(cards[0]);
    const handleCardClick = (card) => {
        setSelectedCard(card);
    };
    const [lineWidth, setLineWidth] = useState('50%');


  return(
    <div className={styles['container']}>
        <div className={styles['containerLeft']}>
              
              <div>
               
                  <ThumbnailSlider cards={cards} onCardClick={handleCardClick} />
                  {/* <CardSlider cards={cards} onCardClick={handleCardClick} /> */}
           
                  {selectedCard && (
                      <div>
                      
                          <img src={selectedCard.image} alt={selectedCard.title} className={styles['mainImg']} />
                     
                      </div>
                  )}
              </div>

              <div className={styles['buttons']}>
                  <button className={styles['buttonAdd']}> <img src="./icons/iconBtn.svg" alt="" />Добавить в сохраненное</button>
                  <button className={styles['buttonShare']}> 
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.503 10.9999C13.9366 11.0003 13.3788 11.1388 12.8777 11.4032C12.3767 11.6677 11.9474 12.0502 11.627 12.5178L6.75089 10.3136C7.09722 9.47642 7.09857 8.53601 6.75463 7.69778L11.624 5.4824C12.0989 6.16993 12.8042 6.66431 13.612 6.87586C14.4197 7.08741 15.2765 7.00212 16.0268 6.63547C16.7772 6.26881 17.3714 5.64506 17.7017 4.87738C18.032 4.1097 18.0765 3.24892 17.8272 2.45119C17.5779 1.65346 17.0512 0.971607 16.3427 0.529324C15.6342 0.0870416 14.7908 -0.0863805 13.9655 0.0405156C13.1402 0.167412 12.3877 0.586221 11.8445 1.22097C11.3012 1.85573 11.0032 2.66438 11.0045 3.50025C11.0077 3.69809 11.0277 3.8953 11.0644 4.08972L5.88788 6.4446C5.3907 5.97829 4.76829 5.66752 4.09711 5.55047C3.42593 5.43342 2.73522 5.51519 2.10982 5.78573C1.48442 6.05627 0.951587 6.5038 0.57677 7.07334C0.201954 7.64288 0.00148245 8.30962 -1.44437e-05 8.99165C-0.00151134 9.67369 0.196031 10.3413 0.568344 10.9125C0.940657 11.4837 1.47152 11.9335 2.09573 12.2068C2.71993 12.4801 3.41028 12.5649 4.08197 12.4508C4.75366 12.3367 5.37742 12.0287 5.87664 11.5646L11.0667 13.9105C11.0306 14.1047 11.0108 14.3016 11.0075 14.4992C11.0074 15.1915 11.2123 15.8683 11.5964 16.444C11.9805 17.0197 12.5266 17.4684 13.1654 17.7334C13.8043 17.9984 14.5074 18.0678 15.1856 17.9328C15.8639 17.7978 16.4869 17.4644 16.976 16.9749C17.465 16.4853 17.798 15.8616 17.9328 15.1826C18.0677 14.5036 17.9984 13.7998 17.7337 13.1602C17.469 12.5206 17.0207 11.974 16.4457 11.5894C15.8706 11.2049 15.1945 10.9997 14.503 10.9999ZM14.503 1.50011C14.8982 1.49996 15.2845 1.61714 15.6132 1.83683C15.9419 2.05652 16.1981 2.36885 16.3494 2.73431C16.5007 3.09978 16.5404 3.50196 16.4634 3.89C16.3864 4.27804 16.1962 4.6345 15.9168 4.9143C15.6374 5.19411 15.2814 5.38468 14.8938 5.46191C14.5062 5.53915 14.1044 5.49958 13.7393 5.34822C13.3742 5.19685 13.0621 4.94049 12.8426 4.61155C12.623 4.28261 12.5058 3.89588 12.5058 3.50025C12.5062 2.97003 12.7167 2.46163 13.0911 2.08664C13.4656 1.71165 13.9734 1.5007 14.503 1.50011ZM3.5161 10.9999C3.12091 11 2.73455 10.8828 2.40589 10.6631C2.07723 10.4435 1.82103 10.1311 1.66969 9.76566C1.51836 9.40019 1.47869 8.99801 1.55569 8.60997C1.6327 8.22193 1.82293 7.86547 2.10232 7.58567C2.38171 7.30586 2.73771 7.1153 3.12529 7.03806C3.51288 6.96082 3.91464 7.00039 4.27976 7.15175C4.64489 7.30312 4.95697 7.55948 5.17654 7.88842C5.39611 8.21736 5.51331 8.60409 5.51331 8.99972C5.51271 9.52988 5.30213 10.0382 4.92773 10.4131C4.55333 10.7881 4.04568 10.9991 3.5161 10.9999ZM14.503 16.4993C14.1078 16.4993 13.7215 16.382 13.393 16.1622C13.0644 15.9425 12.8083 15.6301 12.6571 15.2646C12.5059 14.8991 12.4663 14.497 12.5434 14.109C12.6205 13.721 12.8108 13.3646 13.0902 13.0849C13.3696 12.8051 13.7256 12.6146 14.1132 12.5375C14.5008 12.4603 14.9025 12.4999 15.2676 12.6513C15.6327 12.8027 15.9447 13.059 16.1642 13.388C16.3838 13.7169 16.5009 14.1036 16.5009 14.4992C16.5006 15.0295 16.2899 15.538 15.9153 15.9131C15.5407 16.2881 15.0328 16.4989 14.503 16.4993Z" fill="#CABAFF" />
                      </svg>
                <p> Поделиться </p>      
                      <svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M0.204522 0.735267C0.488802 0.434007 0.963476 0.420242 1.26474 0.704522L9 8.0038L16.7353 0.704522C17.0365 0.420242 17.5112 0.434007 17.7955 0.735267C18.0798 1.03653 18.066 1.5112 17.7647 1.79548L10.0295 9.09476C9.45151 9.64015 8.5485 9.64015 7.97053 9.09476L0.235267 1.79548C-0.0659929 1.5112 -0.079758 1.03653 0.204522 0.735267Z" fill="#CABAFF" />
                      </svg>
                       </button>
</div>

        </div>
          <div className={styles['containerRight']}>

              <h1 className={styles['title']}>Лонг-Айленд</h1>
              <div className={styles['reitings']}>
                  <div className={styles['reitingStar']} >
                      <span>4.2</span>
                      <img width='12px' height='12px' src="./icons/iconStar.svg" alt="" />
                  </div>
                  <div className={styles['reitingQuantity']}>
                      <span>2458</span>
                      <p>оценок</p>
                    
                  </div>
                  <div className={styles['reitingYours']} >
                      <p>Ваша оценка:</p>
                      <span>
                        <img src="./icons/IconYourStarsFull.svg" alt="" /> 
                          <img src="./icons/IconYourStarsFull.svg" alt="" /> 
                          <img src="./icons/IconYourStarsFull.svg" alt="" /> 
                          <img src="./icons/IconYourStarsFull.svg" alt="" /> 
                          <img src="./icons/IconYourStarsEmpty.svg" alt="" /> 
                      
                      
                       </span>
                  </div>

                


              </div>

              <p className={styles['description']}>Классический коктейль, обладающий своеобразным характером и многогранным вкусом. Сочетание различных спиртных напитков создает гармонию пряностей, сладости, кислотности и освежающих ноток.
                      Он отлично подходит для тех, кто предпочитает насыщенные и энергичны</p>
              <button className={styles['descriptionButton']} >Показать полное описание <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.20452 7.73527C3.4888 7.43401 3.96348 7.42024 4.26474 7.70452L12 15.0038L19.7353 7.70452C20.0365 7.42024 20.5112 7.43401 20.7955 7.73527C21.0798 8.03653 21.066 8.5112 20.7647 8.79548L13.0295 16.0948C12.4515 16.6401 11.5485 16.6401 10.9705 16.0948L3.23527 8.79548C2.93401 8.5112 2.92024 8.03653 3.20452 7.73527Z" fill="#CABAFF" />
              </svg></button>
              <div className={styles['tastes']}><h4>Вкусы:</h4><p>пряный, цитрусовый, сладкий, кислый</p></div>
              <div className={styles['filters']} >
                  <div className={styles['filter']} > <img src="./icons/semiAlcogol.svg" alt="" /> <span>Крепкий</span> </div>
                  <div className={styles['filter']}> <img src="./icons/iconShort.svg" alt="" /><span>Лонг</span> </div>
                  <div className={styles['filter']}><img src="./icons/mediumDift.svg" alt="" /> <span>Cредняя сложность</span></div>
                 
                  
              </div>

              <div className={styles['ingredients']} >

                  <div className={styles['ingredientLeft']}>
                      <h3>Ингредиенты</h3>



                      <div className={styles['portionQuantity']}>
                          <h4>Количество порций</h4>
                          <div>
                              <button className={styles['portionQuantityBtn']}>1</button>
                              <button className={styles['portionQuantityBtn']}>2</button>
                              <button className={styles['portionQuantityBtn']}>3</button>
                              <button className={styles['portionQuantityBtn']}>4</button>
                              <button className={styles['portionQuantityBtn']}>5</button>
                              <button className={styles['portionQuantityBtn']}>10</button>
                          </div>
                      </div>
                     

               
                  <div className={styles['ingredient']}>

                    {ingredients.map(ingredient => (
                       <div key ={ingredient.id} className={styles['ingredientLine']}>
                        <span className={styles['ingredientIcon']}>  <img src={ingredient.mark}    alt="" /> </span> 
                            <p className={styles['ingredientName']}>{ingredient.name}</p>
                          <div className={styles['ingredientBand']} >
                             
                          </div>
                            <p className={styles['ingredientMl']}>{ingredient.qty}</p>
                          


                      </div>  
                    ))}
                     



                </div>
 </div>
                  <div className={styles['ingredientRight']}>
                 



                    


                      <div className={styles['equipment']}>
                          <h3>Для приготовления</h3>
                          {equipments.map(equipment => (
                              <div key={equipment.id} className={styles['equipmentLine']}>
                                  <span className={styles['equipmentIcon']}>  <img src={equipment.mark} alt="" /> </span>
                                  <p className={styles['equipmentName']}>{equipment.name}</p>
                                  <div className={styles['equipmentBand']} >

                                  </div>
                                  <p className={styles['equipmentMl']}>{equipment.qty}</p>



                              </div>
                          ))}




                      </div>
                  </div>
              </div>

              <div className={styles['recipes']}>
                  <h3>Рецепт</h3>
                
                  <ol className={styles['recipe']} >
                    
                      {recipes.map(recipe => (<li key={recipes.id} className={styles['recipeDescription']}>{recipe.description}  </li>))}
                      
                      
                  </ol>
              </div>



        </div>
    
    
     </div>
)
}

export default ProductCartOpen; 