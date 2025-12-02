import { GoogleGenAI, Type } from "@google/genai";
import { Member, WorkoutDay, DietMeal } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateWorkoutPlan = async (member: Member): Promise<WorkoutDay[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Create a 3-day split workout routine for a user with the following profile:
      Weight: ${member.weight}kg, Height: ${member.height}cm, Goal: ${member.goal}, Medical Conditions: ${member.medicalConditions || 'None'}.
      Include strictly 3 days. Focus on detailed exercises.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              day: { type: Type.STRING, description: "e.g., 'Day 1: Push' or 'Monday'" },
              focus: { type: Type.STRING, description: "Main focus area" },
              exercises: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    sets: { type: Type.STRING },
                    reps: { type: Type.STRING },
                    rest: { type: Type.STRING, description: "Rest time in seconds/minutes" }
                  }
                }
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as WorkoutDay[];
  } catch (error) {
    console.error("Gemini Workout Error:", error);
    return [];
  }
};

export const generateDietPlan = async (member: Member): Promise<DietMeal[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Create a daily meal plan for a user with:
      Weight: ${member.weight}kg, Goal: ${member.goal}.
      Provide 4 meals (Breakfast, Lunch, Snack, Dinner).`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              meal: { type: Type.STRING, description: "Meal name" },
              suggestion: { type: Type.STRING, description: "Food items description" },
              calories: { type: Type.NUMBER },
              protein: { type: Type.STRING },
              carbs: { type: Type.STRING },
              fats: { type: Type.STRING }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as DietMeal[];
  } catch (error) {
    console.error("Gemini Diet Error:", error);
    return [];
  }
};
