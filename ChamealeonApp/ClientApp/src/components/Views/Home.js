import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import MealCard from '../MealCard/MealCard'
import '../../styles/Home.css'
import SwapMealModal from './SwapMealModal';
import axios from 'axios';
import SwapModal from "../Views/SwapMealModal";

const Home = () => {
  
  const [modalShow, setModalShow] = useState(false);
  const [mealPlan, setMealPlan] = useState([]);
  const [loading, setLoading] = useState(true);

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const token = localStorage.getItem("jwt");
  const config = {
      headers: { Authorization: `Bearer ${token}` }
  };

  useEffect(() => {
    //Reference; https://stackabuse.com/making-asynchronous-http-requests-in-javascript-with-axios/
    axios.get('http://localhost:5000/api/mealplan', config)
        .then(resp => {
            console.log(resp.data)
            setMealPlan(resp.data)
            setLoading(false)
        })
        .catch(err => {
            console.error(err);
        });
  }, [])

  return (
    <div>
      <SwapModal
          modalShow={modalShow}
          setShow={setModalShow}
          >
      </SwapModal>
      <div>

      {
      
      loading
      ? 
        <p>Loading...</p>
      :
        <div className="meal-container">
          {console.log(mealPlan.mealDays)}
          {mealPlan.mealDays.map((data) =>
            <div>
            <h1>{days[data.day]}</h1>

            <div style={{ display: 'flex', flexWrap: "wrap", width: '100%'}}>

              {data.meals.map((meals, index) =>
                <MealCard
                key={meals.id}
                id={meals.id}
                mealDay={meals.day}
                mealIndex={index}
                modalShow={modalShow}
                setShow={setModalShow}
                image={meals.imageUrl}
                title={meals.name}
                cals={meals.nutritionInfo.calories}
                carbs={meals.nutritionInfo.carbs}
                protein={meals.nutritionInfo.protein}
                fat={meals.nutritionInfo.fat}/>
              )}
              
            </div> 
            </div> 
          )}
      </div>
      }
      </div>
    </div>
  );

  
}
export default Home