import styles from './ProductCardOpen.module.css';
import { useState } from 'react';

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
const buttons = [
    { id: 1, btn: 1},
    { id: 2, btn: 2 },
    { id: 3, btn: 3 },
    { id: 4, btn: 4 },
    { id: 5, btn: 5 },
    { id: 10, btn: 10 },
    

]
    const ingredients = [


        { id: 1, mark: './icons/IconEmpty.PNG', name: 'Белый ром', qty: 30, measurement: ' мл' },
        { id: 2, mark: './icons/IconMark.svg', name: 'Водка', qty: 30, measurement: ' мл' },
        { id: 3, mark: './icons/IconEmpty.PNG', name: 'Серебряная текила', qty: 30, measurement: ' мл' },
        { id: 4, mark: './icons/IconEmpty.PNG', name: 'Сухой джин', qty: 30, measurement: ' мл' },
        { id: 4, mark: './icons/IconEmpty.PNG', name: 'Трипл сек', qty: 30, measurement: ' мл' },
        { id: 4, mark: './icons/IconMark.svg', name: 'Сахарный сироп', qty: 30, measurement: ' мл' },
        { id: 4, mark: './icons/IconMark.svg', name: 'Лимонный сок', qty: 30, measurement: ' мл' },
        { id: 4, mark: './icons/IconMark.svg', name: 'Кола', qty: 100, measurement: ' мл' },
        { id: 4, mark: './icons/IconMark.svg', name: 'Лимон', qty: 40, measurement: ' г' },
        { id: 4, mark: './icons/IconMark.svg', name: 'Лед в кубиках', qty: 300, measurement: ' г' },
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
    const socialMedias = [
        { id: 1, icon: './VK.svg', name: 'ВКонтакте' },
        { id: 2, icon: '/OK.svg', name: 'Одноклассники' },
        { id: 3, icon: '/Instagram.svg', name: 'Instagram' },
        { id: 4, icon: '/Facebook.svg', name: 'Facebook' },
        { id: 5, icon: '/X.svg', name: 'X' },
        { id: 6, icon: '/MoiMir.svg', name: 'Мой Мир' },
        { id: 7, icon: '/WhatsApp.svg', name: 'WhatsApp' },
        { id: 8, icon: '/Viber.svg', name: 'Viber' }
    ];
    const informations = [
        {   id: 1,
            title: 'Лонг-Айленд',
            mark: '4,5',
            quantitymark: '2458',
            markStar1: './icons/IconYourStarsFull.svg', markStar1Text: 'fullstar',
            markStar2: './icons/IconYourStarsFull.svg', markStar2Text: 'fullstar',
            markStar3: './icons/IconYourStarsFull.svg', markStar3Text: 'fullstar',
            markStar4: './icons/IconYourStarsFull.svg', markStar4Text: 'fullstar',
            markStar5: './icons/IconYourStarsEmpty.svg', markStar5Text: 'emptystar',
 
            text: 'Классический коктейль, обладающий своеобразным характером и многогранным вкусом. Сочетание различных спиртных напитков создает гармонию пряностей, сладости, кислотности и освежающих ноток.Он отлично подходит для тех, кто предпочитает насыщенные и энергичные напитки',
            fullText: 'Классический коктейль, обладающий своеобразным характером и многогранным вкусом. Сочетание различных спиртных напитков создает гармонию пряностей, сладости, кислотности и освежающих ноток.Он отлично подходит для тех, кто предпочитает насыщенные и энергичные напитки',
            taste: ' пряный, цитрусовый, сладкий, кислы',
            fortress: 'Крепкий',
            fortressImg: './icons/semiAlcogol.svg',
            short: 'Лонг',
            shortImg: './icons/iconShort.svg',
            complexity: 'Cредняя сложность',
            complexityImg: './icons/mediumDift.svg'
          

      } ,
    ]

   
   
    const [lineWidth, setLineWidth] = useState('50%');
    const [isStyled, setIsStyled] = useState(false);
    const [isButtonStyled, setIsButtonStyled] = useState(false);
    const [isFullTextStyled, setIsFullTextStyled] = useState(false);

    const toggleStyle = () => {
        setIsStyled(!isStyled);
    };
    const toggleStyleButton = () => {
        setIsButtonStyled(!isButtonStyled);
    };
    const toggleStyleFullText = () => {
        setIsFullTextStyled(!isFullTextStyled);
    };

    const [result, setResult] = useState(0);

  

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
                  <button className={isButtonStyled ? styles.buttonAdd : styles.buttonAddDel} onClick={toggleStyleButton} > <img src={isButtonStyled ? './icons/iconBtn.svg' : './icons/IconBtdDel.svg'} alt="" />{isButtonStyled ? 'Добавить в сохраненное' : 'Убрать из сохраненного'}  </button>
                  <button className={styles['buttonShare']} onClick={toggleStyle}> 
                      <img src="./IconArrow.svg" />
                <p> Поделиться </p>      
                      <img src={isStyled ? './IconShare.svg' : './IconArrowDown.svg'}/>
                       </button>
                  <div className={isStyled ? styles.socialMediaDropdown : styles.socialMediaDropdownClosed}>
                      <div className={styles['socialMediaBlock']} >
                          {socialMedias.map((socialMedia) => (
                              <div key={socialMedia.id} className={styles.socialMedias} >
                                  <img src={socialMedia.icon} alt="" /> {socialMedia.name}
                              </div>
                          ))}
                      </div>
                  </div>

</div>

        </div>
        { informations.map((information) => (
          <div className={styles['containerRight']} key = {information.id} >

              <h1 className={styles['title']}> {information.title} </h1>
              <div className={styles['reitings']}>
                  <div className={styles['reitingStar']} >
                      <span>{information.mark}</span>
                      <img width='12px' height='12px' src="./icons/iconStar.svg" alt="" />
                  </div>
                  <div className={styles['reitingQuantity']}>
                        <span>{information.quantitymark}</span>
                      <p>оценок</p>
                    
                  </div>
                  <div className={styles['reitingYours']} >
                      <p>Ваша оценка:</p>
                      <span>
                            <img src={information.markStar1} alt={information.markStar1Text} /> 
                            <img src={information.markStar2} alt={information.markStar2Text} /> 
                            <img src={information.markStar3} alt={information.markStar3Text} /> 
                            <img src={information.markStar4} alt={information.markStar4Text} /> 
                            <img src={information.markStar5} alt={information.markStar5Text} /> 
                      
                      
                       </span>
                  </div>

                


              </div>

              <p className={styles['description']}>{information.text}</p>
              <p className={isFullTextStyled ? styles.descriptionFullClosed : styles.descriptionFullOpen}>{information.fullText}</p>
              <button className={styles['descriptionButton']} onClick={toggleStyleFullText} > {isFullTextStyled ? 'Показать полное описание' : 'Свернуть описание'}
                  <img src={isFullTextStyled ? './IconArrowDown.svg' : './IconShare.svg'}/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.20452 7.73527C3.4888 7.43401 3.96348 7.42024 4.26474 7.70452L12 15.0038L19.7353 7.70452C20.0365 7.42024 20.5112 7.43401 20.7955 7.73527C21.0798 8.03653 21.066 8.5112 20.7647 8.79548L13.0295 16.0948C12.4515 16.6401 11.5485 16.6401 10.9705 16.0948L3.23527 8.79548C2.93401 8.5112 2.92024 8.03653 3.20452 7.73527Z" fill="#CABAFF" />
              </button>
                <div className={styles['tastes']}><h4>Вкусы:</h4><p>{information.taste}</p></div>
              <div className={styles['filters']} >
                  <div className={styles['filter']} > <img src={information.fortressImg} alt="" /> <span>{information.fortress}</span> </div>
                    <div className={styles['filter']}> <img src={information.shortImg} alt="" /><span>{information.short}</span> </div>
                    <div className={styles['filter']}><img src={information.complexityImg} alt="" /> <span>{information.complexity}</span></div>
                 
                  
              </div>     

              <div className={styles['ingredients']} >

                  <div className={styles['ingredientLeft']}>
                      <h3>Ингредиенты</h3>



                      <div className={styles['portionQuantity']}>
                          <h4>Количество порций</h4>
                          <div>
                                {buttons.map(button => (<button className={styles['portionQuantityBtn']} key={button.id} > {button.btn}</button>))}
                         
                           
                          </div>
                      </div>
                     

               
                  <div className={styles['ingredient']}>

                    {ingredients.map(ingredient => (
                       <div key ={ingredient.id} className={styles['ingredientLine']}>
                        <span className={styles['ingredientIcon']}>  <img src={ingredient.mark}    alt="" /> </span> 
                            <p className={styles['ingredientName']}>{ingredient.name}</p>
                          <div className={styles['ingredientBand']} >
                             
                          </div> 

                           
                            <p className={styles['ingredientMl']} >

                            

                                 {ingredient.qty}  {ingredient.measurement} 
                                 </p>
                          


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
    ))}
    
     </div>
)
}

export default ProductCartOpen; 