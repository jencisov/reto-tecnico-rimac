export type Audience = 'para-ti' | 'para-alguien-mas';

export interface User {
  name: string;
  lastName: string;
  birthDay: string;
  documentNumber?: string;
  phone?: string;
}

export interface Plan {
  name: string;
  price: number;
  description: string[];
  age: number;
}

export interface SelectedPlan extends Plan {
  originalPrice: number;
  audience: Audience;
}

interface AppState {
  user: User | null;
  plans: Plan[];
  selectedPlan: SelectedPlan | null;
}

const state: AppState = {
  user: null,
  plans: [],
  selectedPlan: null,
};

export const appStore = {
  getUser: () => state.user,
  setUser: (user: User) => {
    state.user = user;
  },
  getPlans: () => state.plans,
  setPlans: (plans: Plan[]) => {
    state.plans = plans;
  },
  getSelectedPlan: () => state.selectedPlan,
  setSelectedPlan: (plan: SelectedPlan) => {
    state.selectedPlan = plan;
  },
  clear: () => {
    state.user = null;
    state.plans = [];
    state.selectedPlan = null;
  },
};

export const DISCOUNT_FOR_OTHERS = 0.05;

export const USER_ENDPOINT =
  'https://rimac-front-end-challenge.netlify.app/api/user.json';
export const PLANS_ENDPOINT =
  'https://rimac-front-end-challenge.netlify.app/api/plans.json';
