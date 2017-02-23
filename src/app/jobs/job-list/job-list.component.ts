import {Component, OnInit, Input} from '@angular/core';
import {Job} from '../../core/models/job';
import {PipelinesService} from '../../core/services/pipelines.service';
import {ErrorService} from '../../core/services/error.service';
import {ConfirmationModalService} from '../../core/services/confirmation-modal.service';
import {FlashMessageService} from '../../core/services/flash-message.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {

  /**
   * List of Jobs to Display
   */
  @Input()
  jobs: Array<Job>;

  /**
   * App ID, used to make back links
   */
  @Input()
  appId: string;

  /**
   * Builds the component and injects services if needed
   */
  constructor(private pipelines: PipelinesService,
              private confirmationModalService: ConfirmationModalService,
              private flashMessageService: FlashMessageService,
              private errorHandler: ErrorService) {
  }

  /**
   * Initialize
   */
  ngOnInit() {
  }

  /**
   * Restarts a Job (Launches new with same params)
   * @param job
   */
  restartJob(job: Job) {
    this.pipelines.startJob(this.appId, job.pipeline_id, {
      commit: job.commit || undefined,
      branch: !job.commit ? job.branch : undefined
    }).then(result => {
      console.log(result);
    }).catch(this.errorHandler.apiError);
  }

  /**
   * Stops a running job
   * @param job
   */
  stopJob(job: Job) {
    this.confirmationModalService
        .openDialog('Terminate Job', 'Are you sure you want to terminate your job?', 'Yes', 'Cancel')
        .then(result => {
            if (result) {
              this.pipelines.stopJob(this.appId, job.job_id)
                .then((res) => {
                  this.flashMessageService.showSuccess('Your job is terminating');
                })
                .catch(e => {
                  this.flashMessageService.showError('Error while terminating your job', e);
                  this.errorHandler.apiError(e);
                });
            }
        });
  }
}
