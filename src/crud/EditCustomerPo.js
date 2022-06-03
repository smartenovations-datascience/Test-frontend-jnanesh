import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Divider } from "primereact/divider";
import { ApproveRejectPoButton } from "../ApprovalRejectPo";
import { UserContext } from "../../../providers/UserProvider";

import CustomerPoService from "../service";
import { ToastContext } from "../../../providers/ToastProvider";
import { useFormData } from "../../../common/field";

const customerPoService = new CustomerPoService();
export default function EditCustomerSideBar({ customerPo }) {
  // initiating options with empty array for choices to overcome *undefined error*
  const user = useContext(UserContext);
  const [options, setOptions] = useState({
    customer_name: { choices: [] },
    region: { choices: [] },
    currency: { choices: [] },
    rate_per_unit: { choices: [] },
  });
  console.log(customerPo.po_confirmation);
  const [customerPoDetails, setCustomerPoDetails, handleOnChange] =
    useFormData(customerPo);
  const [editing, setEditing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const toast = useContext(ToastContext);
  const [designerFormValues, setDesignerFormValues] = useState(
    customerPo.designer
  );

  let totalNoOfUnitsConsumed = 0;

  let navigate = useNavigate();

  const getOptions = () => {
    customerPoService.getCustomerPoOptions().then((data) => {
      setOptions(data.options);
    });
  };

  useEffect(() => {
    getOptions();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const updateCustomerPo = (e) => {
    const data = {
      ...customerPoDetails,
      designer: designerFormValues,
    };
    customerPoService
      .updateCustomerPo(customerPo.id, data)
      .then((customer) => {
        navigate("/crm/customerpo/" + customer.id);
        toast.showSuccess("Updated Customer PO");
      })
      .catch((_) => toast.showWarning("There was an error updating"));

    setEditing(false);
    e.preventDefault();
  };

  const customerPoEditHeader = (
    <div>
      <div style={{ display: "flex", marginLeft: 350 }}>
        <Button
          label="Save"
          icon="pi pi-check"
          className="p-button-text"
          type="submit"
          disabled={!editing}
        />
        <Button
          label="Edit"
          icon="pi pi-pencil"
          type="button"
          className="p-button-text"
          disabled={editing}
          onClick={() => setEditing(true)}
        />
        <div className="col">
          {
          customerPo.po_confirmation == false &&
          customerPo.po_rejected == false &&
          user.hasPermission(["CEO", "Admin"]) ? (
            <ApproveRejectPoButton customerPo={customerPo} />
          ) : null}
        </div>
      </div>
    </div>
  );
  const selectedRegionTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <span
            className={`flag-icon flag-icon-${option.value.toLowerCase()}`}
            width={30}
          ></span>
          <span> {option.display_name}</span>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const regionOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <span
          className={`flag-icon flag-icon-${option.value.toLowerCase()}`}
          width={30}
        ></span>
        <div>{option.display_name}</div>
      </div>
    );
  };

  let handleChange = (i, e) => {
    let newFormValues = [...designerFormValues];
    newFormValues[i][e.target.name] = e.target.value;

    let no_of_units = newFormValues[i]["no_of_units"]
      ? parseInt(newFormValues[i]["no_of_units"])
      : 0;
    newFormValues[i]["no_of_units"] = no_of_units;

    let rate = newFormValues[i]["rate"]
      ? parseInt(newFormValues[i]["rate"])
      : 0;

    newFormValues[i]["amount"] = no_of_units * rate;
    setDesignerFormValues(newFormValues);

    newFormValues.forEach((amt) => {
      totalNoOfUnitsConsumed += amt.no_of_units;

      setCustomerPoDetails({
        ...customerPoDetails,
        no_of_units_consumed: totalNoOfUnitsConsumed,
      });
    });
  };

  let addFormFields = () => {
    setDesignerFormValues([
      ...designerFormValues,
      { designer_name: "", no_of_units: 0, rate: 0, amount: 0 },
    ]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...designerFormValues];
    newFormValues.splice(i, 1);
    setDesignerFormValues(newFormValues);
  };

  const updateCustomerPoForm = (
    <>
      <h5>PO Details</h5>
      <div className="p-fluid formgrid grid">
        <div className="field col-12">
          <label htmlFor="customer_name">Customer Name *</label>
          <Dropdown
            id="customer_name"
            name="customer_name"
            value={customerPoDetails.customer_name}
            onChange={handleOnChange}
            options={options.customer_name.choices}
            optionLabel="display_name"
            optionValue="value"
            className={
              !customerPoDetails.customer_name && submitted ? "p-invalid" : ""
            }
            required
          />
        </div>
        <div className="field col-12">
          <label htmlFor="region">Region *</label>
          <Dropdown
            id="region"
            name="region"
            value={customerPoDetails.region}
            onChange={handleOnChange}
            options={options.region.choices}
            optionLabel="display_name"
            optionValue="value"
            filter
            showClear
            filterBy="display_name"
            placeholder="Select a Region"
            className={
              !customerPoDetails.region && submitted ? "p-invalid" : ""
            }
            valueTemplate={selectedRegionTemplate}
            itemTemplate={regionOptionTemplate}
            required
          />
        </div>
        <div className="field col-12 md:col-12">
          <label htmlFor="report_to">Report to *</label>
          <InputText
            id="report_to"
            name="report_to"
            value={customerPoDetails.report_to}
            onChange={handleOnChange}
            type="text"
            required
          />
        </div>

        <div className="field col-12 md:col-6">
          <label htmlFor="po_no">PO Number*</label>
          <InputText
            id="po_no"
            name="po_no"
            value={customerPoDetails.po_no}
            onChange={handleOnChange}
            type="text"
          />
        </div>
        <div className="field col-12 md:col-6">
          <label htmlFor="issue_date">Issue date*</label>
          <InputText
            id="issue_date"
            name="issue_date"
            value={customerPoDetails.issue_date}
            onChange={handleOnChange}
            type="date"
            // max={new Date().toISOString().split("T")[0]}
          />
        </div>
        <div className="field col-12">
          <label htmlFor="quotation_no">Quotation Number</label>
          <InputText
            id="quotation_no"
            name="quotation_no"
            value={customerPoDetails.quotation_no}
            onChange={handleOnChange}
            type="text"
          />
        </div>
        <div className="field col-12 md:col-6">
          <label htmlFor="quotation_date">Quotation date *</label>
          <InputText
            id="quotation_date"
            name="quotation_date"
            value={customerPoDetails.quotation_date}
            onChange={handleOnChange}
            type="date"
            // max={new Date().toISOString().split("T")[0]}
            required
          />
        </div>
        <div className="field col-12 md:col-6">
          <label htmlFor="expiry_date">Expiry date *</label>
          <InputText
            id="expiry_date"
            name="expiry_date"
            value={customerPoDetails.expiry_date}
            onChange={handleOnChange}
            type="date"
            // max={new Date().toISOString().split("T")[0]}
            required
          />
        </div>
        <div className="field col-12">
          <label htmlFor="currency">Currency *</label>
          <Dropdown
            id="currency"
            name="currency"
            value={customerPoDetails.currency}
            onChange={handleOnChange}
            options={options.currency.choices}
            optionLabel="display_name"
            optionValue="value"
            filter
            showClear
            filterBy="display_name"
            placeholder="Select a Currency"
            className={
              !customerPoDetails.currency && submitted ? "p-invalid" : ""
            }
            required
          />
        </div>
        <div className="field col-12 md:col-6">
          <label htmlFor="rate_per_unit">Rate per unit *</label>
          <Dropdown
            id="rate_per_unit"
            name="rate_per_unit"
            value={customerPoDetails.rate_per_unit}
            onChange={handleOnChange}
            options={options.rate_per_unit.choices}
            optionLabel="display_name"
            optionValue="value"
            filter
            showClear
            filterBy="display_name"
            placeholder="Select a rate per unit"
            className={
              !customerPoDetails.rate_per_unit && submitted ? "p-invalid" : ""
            }
            required
          />
        </div>
        <div className="field col-12 md:col-6">
          <label htmlFor="rate_po">Rate</label>
          <InputText
            id="rate_po"
            name="rate_po"
            value={customerPoDetails.rate_po}
            onChange={handleOnChange}
            type="number"
            required
          />
        </div>
        <div className="field col-12 md:col-12">
          <label htmlFor="no_of_units">Number of units *</label>
          <InputText
            id="no_of_units"
            name="no_of_units"
            value={customerPoDetails.no_of_units}
            onChange={handleOnChange}
            type="number"
            required
          />
        </div>
        <div className="col">
          <h5>Designer*</h5>
          {designerFormValues.map((element, index) => (
            <div key={index} className="p-fluid grid">
              <div
                className="row"
                style={{ marginBottom: "0.25rem", marginTop: "1.5rem" }}
              >
                <div className=" col">
                  <span className="p-float-label">
                    <InputText
                      id="designer_name"
                      type="text"
                      name="designer_name"
                      value={element.designer_name || ""}
                      onChange={(e) => handleChange(index, e)}
                    />
                    <label htmlFor="designer_name">Designer Name *</label>
                  </span>
                </div>
                <div className="col">
                  <span className="p-float-label">
                    <InputText
                      type="number"
                      name="no_of_units"
                      placeholder="No of Units"
                      value={element.no_of_units || 0}
                      onChange={(e) => handleChange(index, e)}
                    />
                    <label htmlFor="no_of_units">No of Units *</label>
                  </span>
                </div>
                <div className="col">
                  <span className="p-float-label">
                    <InputText
                      type="number"
                      name="rate"
                      placeholder="Rate"
                      value={element.rate || 0}
                      onChange={(e) => handleChange(index, e)}
                    />
                    <label htmlFor="rate">Rate *</label>
                  </span>
                </div>
                <div className="col">
                  <span className="p-float-label">
                    <InputText
                      type="number"
                      name="amount"
                      placeholder="Amount"
                      value={element.no_of_units * element.rate || 0}
                      disabled
                    />
                    <label htmlFor="amount">Amount *</label>
                  </span>
                </div>
                <div>
                  {index === 0 ? (
                    <Button
                      icon="pi pi-plus"
                      className="p-button-rounded"
                      type="button"
                      onClick={() => addFormFields()}
                    />
                  ) : (
                    <Button
                      icon="pi pi-trash"
                      className="p-button-rounded p-button-danger"
                      onClick={() => removeFormFields(index)}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* {console.log(customerPoDetails.no_of_units_consumed)} */}
        <div className="field col-12 md:col-12">
          <label htmlFor="no_of_units_consumed">
            Number of units consumed *
          </label>
          <InputText
            id="no_of_units_consumed"
            name="no_of_units_consumed"
            value={customerPoDetails.no_of_units_consumed}
            onChange={handleOnChange}
            type="number"
            required
          />
        </div>
        <div className="field col-12">
          <label htmlFor="place_of_delivery">Place of delivery*</label>
          <InputText
            id="place_of_delivery"
            name="place_of_delivery"
            value={customerPoDetails.place_of_delivery}
            onChange={handleOnChange}
            type="text"
          />
        </div>
        <div className="field col-12 md:col-12">
          <label htmlFor="ssi_no">SSI number</label>
          <InputText
            id="ssi_no"
            name="ssi_no"
            value={customerPoDetails.ssi_no}
            onChange={handleOnChange}
            type="text"
          />
        </div>
        <div className="field col-12">
          <label htmlFor="payment_terms">Payment terms*</label>
          <InputText
            id="payment_terms"
            name="payment_terms"
            value={customerPoDetails.payment_terms}
            onChange={handleOnChange}
            type="text"
          />
        </div>
        <div className="field col-12">
          <label htmlFor="po_confirm_date">PO confirmation date</label>
          <InputText
            id="po_confirm_date"
            name="po_confirm_date"
            value={customerPoDetails.po_confirm_date}
            onChange={handleOnChange}
            type="date"
            // max={new Date().toISOString().split("T")[0]}
            required
          />
        </div>

        <h5>Invoice</h5>
        <div className="field col-12">
          <label htmlFor="invoice_to">Invoice To address *</label>
          <InputTextarea
            id="invoice_to"
            name="invoice_to"
            value={customerPoDetails.invoice_to}
            onChange={handleOnChange}
            type="text"
            required
          />
        </div>
        <div className="field col-12">
          <label htmlFor="invoice_contact_no">Contact Number *</label>
          <InputText
            id="invoice_contact_no"
            name="invoice_contact_no"
            value={customerPoDetails.invoice_contact_no}
            onChange={handleOnChange}
            type="text"
            required
          />
        </div>
        <div className="field col-12">
          <label htmlFor="vendor_code">Vendor code *</label>
          <InputText
            id="vendor_code"
            name="vendor_code"
            value={customerPoDetails.vendor_code}
            onChange={handleOnChange}
            type="text"
            required
          />
        </div>
        <div className="field col-12">
          <label htmlFor="vendor_gstn">Vendor GSTN/ VAT Number *</label>
          <InputText
            id="vendor_gstn"
            name="vendor_gstn"
            value={customerPoDetails.vendor_gstn}
            onChange={handleOnChange}
            maxLength={15}
            type="text"
            required
          />
        </div>
        <div className="field col-12">
          <label htmlFor="vendor_state">State *</label>
          <InputText
            id="vendor_state"
            name="vendor_state"
            value={customerPoDetails.vendor_state}
            onChange={handleOnChange}
            type="text"
            required
          />
        </div>
        <div className="field col-12">
          <label htmlFor="vendor_state_code">State Code *</label>
          <InputText
            id="vendor_state_code"
            name="vendor_state_code"
            value={customerPoDetails.vendor_state_code}
            onChange={handleOnChange}
            type="text"
            required
          />
        </div>

        <h5>Consignee</h5>
        <div className="field col-12">
          <label htmlFor="consignee">Consignee To address *</label>
          <InputTextarea
            id="consignee"
            name="consignee"
            value={customerPoDetails.consignee}
            onChange={handleOnChange}
            type="text"
          />
        </div>
        <div className="field col-12">
          <label htmlFor="consignee_email">Consignee Email *</label>
          <InputText
            id="consignee_email"
            name="consignee_email"
            value={customerPoDetails.consignee_email}
            onChange={handleOnChange}
            type="email"
          />
        </div>
        <div className="field col-12">
          <label htmlFor="consignee_gstn">Consignee GSTN</label>
          <InputText
            id="consignee_gstn"
            name="consignee_gstn"
            value={customerPoDetails.consignee_gstn}
            onChange={handleOnChange}
            maxLength={15}
            type="text"
          />
        </div>
        <div className="field col-12">
          <label htmlFor="consignee_state">State</label>
          <InputText
            id="consignee_state"
            name="consignee_state"
            value={customerPoDetails.consignee_state}
            onChange={handleOnChange}
            type="text"
          />
        </div>
        <div className="field col-12">
          <label htmlFor="consignee_state_code">State Code</label>
          <InputText
            id="consignee_state_code"
            name="consignee_state_code"
            value={customerPoDetails.consignee_state_code}
            onChange={handleOnChange}
            type="text"
          />
        </div>
        <div className="field col-12">
          <label htmlFor="service_description">Service Description *</label>
          <InputTextarea
            id="service_description"
            name="service_description"
            value={customerPoDetails.service_description}
            onChange={handleOnChange}
            type="text"
          />
        </div>
      </div>
    </>
  );

  return (
    <div>
      <form onSubmit={updateCustomerPo} onInvalid={() => setSubmitted(true)}>
        {customerPoEditHeader}
        {/* {user.hasPermission(["CEO", "Admin"]) ? (
                    <ApproveRejectPoButton customerPo={rowData}/>
                ) : null} */}
        <Divider />
        {updateCustomerPoForm}
      </form>
    </div>
  );
}
