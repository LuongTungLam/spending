import { createSelector } from "@ngrx/store";
import { AppState } from "..";

export const contolState = (state: AppState) => state.login;

export const selectedOptionSelector = createSelector(contolState, state => state.user);