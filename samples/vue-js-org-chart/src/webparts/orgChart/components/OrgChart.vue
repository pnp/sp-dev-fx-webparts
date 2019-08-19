<template>
  <div :class="$style.OrgChart">
    <div :class="$style.container">
      <div :class="$style.row">
        <div :class="$style.column">
          <div v-if="error"> 
            Error: {{error.message}}
          </div>
          <ou-spinner v-if="isLoading" type='large' />
          <div id="tree">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { IListService } from "../models/IListService";
import Employee from "../models/Employee";

require("spOrgChart");

/**
 * Component's properties
 */
export interface IOrgChartProps {
  spService: IListService;
}

/**
 * Class-component
 */
@Component
export default class OrgChart extends Vue implements IOrgChartProps {
  /**
   * implementing ISimpleWebPartProps interface
   */
  @Prop()
  public spService: IListService;

  public error?: Error;
  public isLoading:boolean;
  public employees:Employee[];

  _getEmployeeItems() {
      this.spService.getEmployees().then((employees: Employee[]) => {
        this.isLoading = false;
        this.employees = employees;
        this.initiliazeOrgChart(employees);
      }).catch((err: Error) => {
        this.isLoading= false;
        this.error= err;
        });
    }

  initiliazeOrgChart(employees: Employee[]) {
    var el: any = document.getElementById("tree");
    if (el) {
      var chart = new window["OrgChart"](el, {
        template: "rony",
        enableSearch: true,
        nodeBinding: {
          field_0: "Title",
          field_1: "JobTitle",
          field_2: "EMail",
          img_0: "PhotoUrl"
        },
        nodes: employees
      });
    }
  }

  constructor(){
      this.isLoading = true;
      this.employees = new Array<Employee>();
  }

  created(){
    this._getEmployeeItems();
  }
}
</script>

<style lang="scss" module>
@import "~@microsoft/sp-office-ui-fabric-core/dist/sass/_SPFabricCore.scss";

.OrgChart {
  .container {
    max-width: 700px;
    margin: 0px auto;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
  }

  .row {
    @include ms-Grid-row;
    @include ms-fontColor-white;
    background-color: $ms-color-themeDark;
    padding: 20px;
  }

  .column {
    @include ms-Grid-col;
    @include ms-lg10;
    @include ms-xl8;
    @include ms-xlPush2;
    @include ms-lgPush1;
  }

  .title {
    @include ms-font-xl;
    @include ms-fontColor-white;
  }

  .subTitle {
    @include ms-font-l;
    @include ms-fontColor-white;
  }

  .description {
    @include ms-font-l;
    @include ms-fontColor-white;
  }

  .button {
    // Our button
    text-decoration: none;
    height: 32px;

    // Primary Button
    min-width: 80px;
    background-color: $ms-color-themePrimary;
    border-color: $ms-color-themePrimary;
    color: $ms-color-white;

    // Basic Button
    outline: transparent;
    position: relative;
    font-family: "Segoe UI WestEuropean", "Segoe UI", -apple-system,
      BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: $ms-font-size-m;
    font-weight: $ms-font-weight-regular;
    border-width: 0;
    text-align: center;
    cursor: pointer;
    display: inline-block;
    padding: 0 16px;

    .label {
      font-weight: $ms-font-weight-semibold;
      font-size: $ms-font-size-m;
      height: 32px;
      line-height: 32px;
      margin: 0 4px;
      vertical-align: top;
      display: inline-block;
    }
  }
}
</style>


