import { TestBed, inject } from '@angular/core/testing';

import { StatsClientService } from './stats-client.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { STATS_CLIENT_CONFIG } from './config';

const projects = {
  'projects': [
    {
      'dashboardUrl': 'https://k8s.cncftest.io',
      'dbDumpUrl': 'https://cncftest.io/gha.dump',
      'name': 'kubernetes',
      'repo': 'kubernetes/kubernetes',
      'status': 'Graduated',
      'title': 'Kubernetes'
    },
    {
      'dashboardUrl': 'https://prometheus.cncftest.io',
      'dbDumpUrl': 'https://cncftest.io/prometheus.dump',
      'name': 'prometheus',
      'repo': 'prometheus/prometheus',
      'status': 'Incubating',
      'title': 'Prometheus'
    }
  ]
};

const projectStats = {
  'activityTotals': {
    'day': {
      'commits': 105,
      'discussion': 1395,
      'stars': 82
    },
    'month': {
      'commits': 1302,
      'discussion': 31280,
      'stars': 3913
    },
    'week': {
      'commits': 456,
      'discussion': 7158,
      'stars': 864
    }
  },
  'commitGraph': {
    'day': [
      [
        0,
        0
      ],
      [
        1,
        1
      ],
      [
        2,
        2
      ],
      [
        3,
        1
      ],
      [
        4,
        1
      ],
      [
        5,
        1
      ],
      [
        6,
        2
      ],
      [
        7,
        2
      ],
      [
        8,
        1
      ],
      [
        9,
        8
      ],
      [
        10,
        7
      ],
      [
        11,
        26
      ],
      [
        12,
        25
      ],
      [
        13,
        5
      ],
      [
        14,
        1
      ],
      [
        15,
        1
      ],
      [
        16,
        3
      ],
      [
        17,
        0
      ],
      [
        18,
        5
      ],
      [
        19,
        8
      ],
      [
        20,
        2
      ],
      [
        21,
        0
      ],
      [
        22,
        3
      ],
      [
        23,
        0
      ]
    ],
    'month': [
      [
        0,
        235
      ],
      [
        1,
        241
      ],
      [
        2,
        304
      ],
      [
        3,
        456
      ]
    ],
    'week': [
      [
        0,
        117
      ],
      [
        1,
        64
      ],
      [
        2,
        51
      ],
      [
        3,
        4
      ],
      [
        4,
        7
      ],
      [
        5,
        114
      ],
      [
        6,
        105
      ]
    ]
  },
  'latestVersion': 'v1.12.0-alpha.0',
  'openIssues': 7262,
  'recentDiscussion': 31280,
  'stars': 89660
};

describe('StatsClientService', () => {
  let httpTestingController: HttpTestingController;
  const baseUrl = 'https://cncfstats.local';

  function expectGetUrl(url) {
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    return req;
  }


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StatsClientService,
        {
          provide: STATS_CLIENT_CONFIG,
          useValue: baseUrl
        }
      ],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([StatsClientService], (service: StatsClientService) => {
    expect(service).toBeTruthy();
  }));

  it('should get project stats', inject([StatsClientService], (service: StatsClientService) => {
    service.project('all').subscribe(data =>
      expect(data).toEqual(projectStats)
    );
    const req = expectGetUrl(baseUrl + '/jsons/all.json');
    req.flush(projectStats);
  }));

  it('should get projects list', inject([StatsClientService], (service: StatsClientService) => {
    service.projectList().subscribe(data =>
      expect(data).toEqual(projects.projects)
    );
    const req = expectGetUrl(baseUrl + '/jsons/projects.json');
    req.flush(projects);
  }));
});
