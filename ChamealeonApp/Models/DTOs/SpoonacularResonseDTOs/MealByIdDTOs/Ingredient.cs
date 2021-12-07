using System.Collections.Generic; 
namespace ChamealeonApp.Models.DTOs.SpoonacularResonseDTOs.MealByIdDTOs{ 

    public class Ingredient
    {
        public int id { get; set; }
        public string name { get; set; }
        public double amount { get; set; }
        public string unit { get; set; }
        public List<Nutrient> nutrients { get; set; }
    }

}