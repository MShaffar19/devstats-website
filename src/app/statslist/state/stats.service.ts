import { Injectable } from '@angular/core';
import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { StatsState } from './stats-list.reducer';
import { Observable } from 'rxjs/index';
import { ProjectStats } from '../stats-client/models/ProjectStats';
import { Project } from '../stats-client/models/Project';

export const featureSelector = createFeatureSelector<StatsState>('statsList');
export const projectStatsSelector = (projectName: string) => createSelector(featureSelector, (stats) => {
  try {
    return stats.projects.find(p => p.name === projectName).stats;
  } catch (e) {
    return null;
  }
});

export const projectsSelector = createSelector(featureSelector, (stats) => {
  return stats.projects.filter(p => p.name !== 'all') || [];
});

export const allSelector = createSelector(featureSelector, (stats) => {
  return stats.projects.find(p => p.name === 'all');
});

export const shownProject = createSelector(featureSelector, (stats) => {
  return stats.shownProject;
});

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  constructor(private store: Store<{ statsList: StatsState }>) {
  }

  public getShownProject(): Observable<string> {
    return this.store
      .select(shownProject);
  }

  public getProjects(): Observable<Project[]> {
    return this.store
      .select(projectsSelector);
  }

  public getAllStats(): Observable<Project> {
    return this.store
      .select(allSelector);
  }
}
