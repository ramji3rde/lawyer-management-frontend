import React from 'react'
import { Tabs, Modal , Card, notification } from 'antd'
import { useSelector , connect} from 'react-redux'
import Account from './account&payment/Account/account'
import Payment from './account&payment/PaymentInfo/payment'
import CustomFeilds from './CustomFeilds/CustomFeilds'
import { Form, Button, Row, Col } from 'react-bootstrap'
import api from '../../../resources/api'
const { TabPane } = Tabs;

let userData = {}
let errors = {
    type: "",
    emailAddress: "",
    number: "",
    website: "",
    address: "",
    street: "",
    city: "",
    country: "",
    state: "",
    zipCode: "",
  };


const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
const validNameRegex = RegExp(
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
  );
class customFeilds extends React.Component {
  constructor(props){
      super(props)
      this.state = {
        modal1Visible: false,
        modal2Visible: false,
        disable : false,
        Data : {
            name: '',
            emailAddress : '',
            timeFormat : "HH:SS PM",
            dateFormat : "DD/MM/YYYY",
            //Date : '',
           // Currency : '', 
            address : {

            }
          },
          userData : {
            account : {
                address : {
                    type: "Work"
                }
            }
        }
        
      }
  }

  componentDidMount(){
    
      api.get('/user/view/' + this.props.userId).then((res)=>{
        console.log(res)
        userData = res.data.data
        if(res.data.data.account == undefined){
            userData.account = {
                address : {
                    type: "Work"
                }
            }
        }
        if(res.data.data.account.name == undefined || res.data.data.account.name == ""){
                userData.account.name = `Law office of ${userData.firstName + " " + userData.lastName}`
        }
        if(res.data.data.account.timeFormat == undefined || res.data.data.account.timeFormat == ""){
            userData.account.timeFormat = "HH:SS PM"
        }
        if(res.data.data.account.dateFormat == undefined || res.data.data.account.dateFormat == ""){
            userData.account.dateFormat = "DD/MM/YYYY"
        }
        if(res.data.data.account.address.type == undefined || res.data.data.account.address.type == ""){
            userData.account.address.type = "Work"
        }
        this.setState({
            Data : userData.account,
            prevState : userData.account
        })
        this.setState({userData})
     
      })
  }

  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }

  render() {
    const HandleChange=(e)=>{
        e.persist()
        const { name, value } = e.target
        let newstate = this.state
        
        newstate.Data[e.target.name] = e.target.value
        this.setState({Data : newstate.Data})
        console.log(this.state.Data)
        switch (name) {
            case 'emailAddress':
              errors.emailAddress = validEmailRegex.test(value)
                ? ''
                : 'Email is not valid!';
              break;
            case 'number':
              errors.number =
                value.length < 10 || value.length > 13
                  ? 'Phone number must be between 10 and 13 digits'
                  : '';
              break;
  
            default:
              break;
          }
    }
    const HandleOk=()=>{
        this.setState({dataStatus : true})
        this.setModal2Visible(false)

    }
    const HandleAddressChange = (e) => {
        
        e.persist();
        const { id, value, name } = e.target;
  
        let newState = this.state;
        newState.Data.address[name] = value;
        this.setState(newState);
        switch (e.target.name) {
            /* 
                case 'type':
              errors.type = value === 'default' ? 'Type is required!' : '';
              break;
    
            case 'country':
              errors.country =
                value === 'default' ? 'Country is required!' : '';
              break;
    
            case 'street':
              errors.street =
                value.length == 0
                  ? ''
                  : value.length < 2
                  ? 'Street is Required'
                  : '';
              break;
            case 'city':
              errors.city =
                value.length == 0
                  ? ''
                  : !validNameRegex.test(value)
                  ? 'City Name must be in characters!'
                  : value.length < 2
                  ? 'City is Required'
                  : '';
              break;
            case 'state':
              errors.state =
                value.length == 0
                  ? ''
                  : !validNameRegex.test(value)
                  ? 'State Name must be in characters!'
                  : value.length < 2
                  ? 'State is Required'
                  : '';
              break;
            */
            case 'zipCode':
              errors.zipCode =
                value.length == 0
                  ? ''
                  : value.length > 4 && value.length < 10
                  ? ''
                  : 'Zipcode is should be of length between 4 to 10!';
              break;
          }

    
      }
      const HandleCurrencyChange=(e)=> {
      e.persist();
      let newstate = this.state;
      newstate.Data[e.target.name] = e.target.value
      this.setState({Data : newstate.Data})
      console.log(this.state)
        // console.log(e.target.value);
      }
      const handleSubmit = ( ) =>{
        notification.destroy()
        const validateForm = () => {
            let valid = true;
            Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
            return valid;
          };
          if (validateForm()) {
            console.log(this.state.userData.account)
            console.log(this.state.Data)
            /*
            if(JSON.stringify(this.state.userData.account) === JSON.stringify(this.state.Data)){
                notification.warning({message : "Please provide new details"})
            }
            */
            if(this.state.Data.name === ""){
                notification.warning({
                    message : "Please provide a name"
                })
            }
            else{
                this.setState({
                    disable : true
                  })
                  userData.account = this.state.Data
                  delete userData.userName
                  api.post('/user/update/' + this.props.userId, userData).then((res)=>{
                      console.log(res)
                      this.setState({
                        disable : false
                      })
                      notification.success({message : "User Data saved."})
                  }).catch((err) => {
                      console.log(err)
                      this.setState({
                        disable : false
                      })
                      notification.error({message : "Failed to update user details"})
                  })
            }
        }else{
            notification.warning({message : "Please provide all the details correctly."})
        }
      }
  //  const operations = <Button onClick={() => this.setModal2Visible(true)}>Add Account</Button>
  console.log("_____________")
  console.log(this.state.Data.currencyFormat)
    return (
      <Card>
        <Tabs>
             <TabPane tab="Account" key="1">
                    <Form>
                        <div className="form-header-container mb-4">
                            <h4 className="form-header-text">General information</h4>
                        </div>
                        <Form.Row>
                            <Col className="col-md-5">
                                <Form.Group controlId="Name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control defaultValue={this.state.userData.account.name} type="text" name="name"  onChange={HandleChange} />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        
                        <br></br>
                        <div className="form-header-container mb-4">
                            <h4 className="form-header-text">Contact information</h4>
                        </div>
                        <Form.Row>
                            <Col className="col-md-5">
                                <Form.Group controlId="number">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control defaultValue={this.state.userData.account.number} type="number" name="number" placeholder="Phone Number"  onChange={HandleChange} />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <p className="help-block text-danger">{errors.number}</p>
                        <Form.Row>
                        <Col className="col-md-5">
                            <Form.Group controlId="Email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control defaultValue={this.state.userData.account.emailAddress} type="text" name="emailAddress" placeholder="Email"  onChange={HandleChange}/>
                            </Form.Group>
                        </Col>
                            
                        </Form.Row>
                        <p className="help-block text-danger">{errors.emailAddress}</p>
                        <Form.Row>
                        <Col className="col-md-5">
                            <Form.Group controlId="website">
                                <Form.Label>Website</Form.Label>
                                <Form.Control defaultValue={this.state.userData.account.website} type="text" name="website" placeholder="Website"  onChange={HandleChange}/>
                            </Form.Group>
                        </Col>
                        </Form.Row>

                        <div className="form-header-container mb-4">
                            <h4 className="form-header-text">Mail Address</h4>
                        </div>
                        <Form.Row>
                            <Col  sm className="col-md-4">
                                <Form.Group controlId="type">
                                <Form.Control
                                    as="select"
                                    name="type"
                                    defaultValue={this.state.userData.account.address ? this.state.userData.account.address.type : "" }
                                    onChange={HandleAddressChange}
                                >
                                    <option>Work</option>
                                    <option>Home</option>
                                    <option>other</option>
                                </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col sm className="col-md-4">
                                <Form.Group controlId="street">
                                <Form.Control
                                    name="street"
                                    type="text"
                                    placeholder="Street"
                                    defaultValue={this.state.userData.account.address ? this.state.userData.account.address.street : ""}
                                    onChange={HandleAddressChange}
                                />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col sm className="col-md-4">
                                <Form.Group controlId="city">
                                <Form.Control
                                    name="city"
                                    type="text"
                                    placeholder="City" 
                                    defaultValue={this.state.userData.account.address ? this.state.userData.account.address.city : ""}
                                    onChange={HandleAddressChange}
                                />
                                </Form.Group>
                            </Col>
                            <Col sm className="col-md-4">
                                    <Form.Group controlId="state">
                                    <Form.Control
                                        name="state"
                                        type="text"
                                        placeholder="State"
                                        defaultValue={this.state.userData.account.address ? this.state.userData.account.address.state : ""}
                                        onChange={HandleAddressChange}
                                    />
                                    </Form.Group>
                            </Col>              
                        </Form.Row>
                        <Form.Row>
                            <Col sm className="col-md-4">
                                <Form.Group controlId="zipCode">
                                <Form.Control
                                    name="zipCode"
                                    type="number"
                                    placeholder="ZipCode"
                                    defaultValue={this.state.userData.account.address ? this.state.userData.account.address.zipCode : ""}
                                    onChange={HandleAddressChange}
                                />
                                </Form.Group>  
                             </Col>
                            <Col sm className="col-md-4">
                                <Form.Group controlId="country">
                                <select
                                    name="country"
                                    defaultValue={this.state.userData.account.address ? this.state.userData.account.address.country : ""}
                                    onChange={HandleAddressChange}
                                    style={{ "border-radius": "5px" }}
                                >
                                    <option value="default">Country</option>
                                    <option value="Afganistan">Afghanistan</option>
                                    <option value="Albania">Albania</option>
                                    <option value="Algeria">Algeria</option>
                                    <option value="American Samoa">
                                    American Samoa
                                    </option>
                                    <option value="Andorra">Andorra</option>
                                    <option value="Angola">Angola</option>
                                    <option value="Anguilla">Anguilla</option>
                                    <option value="Antigua & Barbuda">
                                    Antigua & Barbuda
                                    </option>
                                    <option value="Argentina">Argentina</option>
                                    <option value="Armenia">Armenia</option>
                                    <option value="Aruba">Aruba</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Austria">Austria</option>
                                    <option value="Azerbaijan">Azerbaijan</option>
                                    <option value="Bahamas">Bahamas</option>
                                    <option value="Bahrain">Bahrain</option>
                                    <option value="Bangladesh">Bangladesh</option>
                                    <option value="Barbados">Barbados</option>
                                    <option value="Belarus">Belarus</option>
                                    <option value="Belgium">Belgium</option>
                                    <option value="Belize">Belize</option>
                                    <option value="Benin">Benin</option>
                                    <option value="Bermuda">Bermuda</option>
                                    <option value="Bhutan">Bhutan</option>
                                    <option value="Bolivia">Bolivia</option>
                                    <option value="Bonaire">Bonaire</option>
                                    <option value="Bosnia & Herzegovina">
                                    Bosnia & Herzegovina
                                    </option>
                                    <option value="Botswana">Botswana</option>
                                    <option value="Brazil">Brazil</option>
                                    <option value="British Indian Ocean Ter">
                                    British Indian Ocean Ter
                                    </option>
                                    <option value="Brunei">Brunei</option>
                                    <option value="Bulgaria">Bulgaria</option>
                                    <option value="Burkina Faso">Burkina Faso</option>
                                    <option value="Burundi">Burundi</option>
                                    <option value="Cambodia">Cambodia</option>
                                    <option value="Cameroon">Cameroon</option>
                                    <option value="Canada">Canada</option>
                                    <option value="Canary Islands">
                                    Canary Islands
                                    </option>
                                    <option value="Cape Verde">Cape Verde</option>
                                    <option value="Cayman Islands">
                                    Cayman Islands
                                    </option>
                                    <option value="Central African Republic">
                                    Central African Republic
                                    </option>
                                    <option value="Chad">Chad</option>
                                    <option value="Channel Islands">
                                    Channel Islands
                                    </option>
                                    <option value="Chile">Chile</option>
                                    <option value="China">China</option>
                                    <option value="Christmas Island">
                                    Christmas Island
                                    </option>
                                    <option value="Cocos Island">Cocos Island</option>
                                    <option value="Colombia">Colombia</option>
                                    <option value="Comoros">Comoros</option>
                                    <option value="Congo">Congo</option>
                                    <option value="Cook Islands">Cook Islands</option>
                                    <option value="Costa Rica">Costa Rica</option>
                                    <option value="Cote DIvoire">Cote DIvoire</option>
                                    <option value="Croatia">Croatia</option>
                                    <option value="Cuba">Cuba</option>
                                    <option value="Curaco">Curacao</option>
                                    <option value="Cyprus">Cyprus</option>
                                    <option value="Czech Republic">
                                    Czech Republic
                                    </option>
                                    <option value="Denmark">Denmark</option>
                                    <option value="Djibouti">Djibouti</option>
                                    <option value="Dominica">Dominica</option>
                                    <option value="Dominican Republic">
                                    Dominican Republic
                                    </option>
                                    <option value="East Timor">East Timor</option>
                                    <option value="Ecuador">Ecuador</option>
                                    <option value="Egypt">Egypt</option>
                                    <option value="El Salvador">El Salvador</option>
                                    <option value="Equatorial Guinea">
                                    Equatorial Guinea
                                    </option>
                                    <option value="Eritrea">Eritrea</option>
                                    <option value="Estonia">Estonia</option>
                                    <option value="Ethiopia">Ethiopia</option>
                                    <option value="Falkland Islands">
                                    Falkland Islands
                                    </option>
                                    <option value="Faroe Islands">Faroe Islands</option>
                                    <option value="Fiji">Fiji</option>
                                    <option value="Finland">Finland</option>
                                    <option value="France">France</option>
                                    <option value="French Guiana">French Guiana</option>
                                    <option value="French Polynesia">
                                    French Polynesia
                                    </option>
                                    <option value="French Southern Ter">
                                    French Southern Ter
                                    </option>
                                    <option value="Gabon">Gabon</option>
                                    <option value="Gambia">Gambia</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Germany">Germany</option>
                                    <option value="Ghana">Ghana</option>
                                    <option value="Gibraltar">Gibraltar</option>
                                    <option value="Great Britain">Great Britain</option>
                                    <option value="Greece">Greece</option>
                                    <option value="Greenland">Greenland</option>
                                    <option value="Grenada">Grenada</option>
                                    <option value="Guadeloupe">Guadeloupe</option>
                                    <option value="Guam">Guam</option>
                                    <option value="Guatemala">Guatemala</option>
                                    <option value="Guinea">Guinea</option>
                                    <option value="Guyana">Guyana</option>
                                    <option value="Haiti">Haiti</option>
                                    <option value="Hawaii">Hawaii</option>
                                    <option value="Honduras">Honduras</option>
                                    <option value="Hong Kong">Hong Kong</option>
                                    <option value="Hungary">Hungary</option>
                                    <option value="Iceland">Iceland</option>
                                    <option value="Indonesia">Indonesia</option>
                                    <option value="India">India</option>
                                    <option value="Iran">Iran</option>
                                    <option value="Iraq">Iraq</option>
                                    <option value="Ireland">Ireland</option>
                                    <option value="Isle of Man">Isle of Man</option>
                                    <option value="Israel">Israel</option>
                                    <option value="Italy">Italy</option>
                                    <option value="Jamaica">Jamaica</option>
                                    <option value="Japan">Japan</option>
                                    <option value="Jordan">Jordan</option>
                                    <option value="Kazakhstan">Kazakhstan</option>
                                    <option value="Kenya">Kenya</option>
                                    <option value="Kiribati">Kiribati</option>
                                    <option value="Korea North">Korea North</option>
                                    <option value="Korea Sout">Korea South</option>
                                    <option value="Kuwait">Kuwait</option>
                                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                                    <option value="Laos">Laos</option>
                                    <option value="Latvia">Latvia</option>
                                    <option value="Lebanon">Lebanon</option>
                                    <option value="Lesotho">Lesotho</option>
                                    <option value="Liberia">Liberia</option>
                                    <option value="Libya">Libya</option>
                                    <option value="Liechtenstein">Liechtenstein</option>
                                    <option value="Lithuania">Lithuania</option>
                                    <option value="Luxembourg">Luxembourg</option>
                                    <option value="Macau">Macau</option>
                                    <option value="Macedonia">Macedonia</option>
                                    <option value="Madagascar">Madagascar</option>
                                    <option value="Malaysia">Malaysia</option>
                                    <option value="Malawi">Malawi</option>
                                    <option value="Maldives">Maldives</option>
                                    <option value="Mali">Mali</option>
                                    <option value="Malta">Malta</option>
                                    <option value="Marshall Islands">
                                    Marshall Islands
                                    </option>
                                    <option value="Martinique">Martinique</option>
                                    <option value="Mauritania">Mauritania</option>
                                    <option value="Mauritius">Mauritius</option>
                                    <option value="Mayotte">Mayotte</option>
                                    <option value="Mexico">Mexico</option>
                                    <option value="Midway Islands">
                                    Midway Islands
                                    </option>
                                    <option value="Moldova">Moldova</option>
                                    <option value="Monaco">Monaco</option>
                                    <option value="Mongolia">Mongolia</option>
                                    <option value="Montserrat">Montserrat</option>
                                    <option value="Morocco">Morocco</option>
                                    <option value="Mozambique">Mozambique</option>
                                    <option value="Myanmar">Myanmar</option>
                                    <option value="Nambia">Nambia</option>
                                    <option value="Nauru">Nauru</option>
                                    <option value="Nepal">Nepal</option>
                                    <option value="Netherland Antilles">
                                    Netherland Antilles
                                    </option>
                                    <option value="Netherlands">
                                    Netherlands (Holland, Europe)
                                    </option>
                                    <option value="Nevis">Nevis</option>
                                    <option value="New Caledonia">New Caledonia</option>
                                    <option value="New Zealand">New Zealand</option>
                                    <option value="Nicaragua">Nicaragua</option>
                                    <option value="Niger">Niger</option>
                                    <option value="Nigeria">Nigeria</option>
                                    <option value="Niue">Niue</option>
                                    <option value="Norfolk Island">
                                    Norfolk Island
                                    </option>
                                    <option value="Norway">Norway</option>
                                    <option value="Oman">Oman</option>
                                    <option value="Pakistan">Pakistan</option>
                                    <option value="Palau Island">Palau Island</option>
                                    <option value="Palestine">Palestine</option>
                                    <option value="Panama">Panama</option>
                                    <option value="Papua New Guinea">
                                    Papua New Guinea
                                    </option>
                                    <option value="Paraguay">Paraguay</option>
                                    <option value="Peru">Peru</option>
                                    <option value="Phillipines">Philippines</option>
                                    <option value="Pitcairn Island">
                                    Pitcairn Island
                                    </option>
                                    <option value="Poland">Poland</option>
                                    <option value="Portugal">Portugal</option>
                                    <option value="Puerto Rico">Puerto Rico</option>
                                    <option value="Qatar">Qatar</option>
                                    <option value="Republic of Montenegro">
                                    Republic of Montenegro
                                    </option>
                                    <option value="Republic of Serbia">
                                    Republic of Serbia
                                    </option>
                                    <option value="Reunion">Reunion</option>
                                    <option value="Romania">Romania</option>
                                    <option value="Russia">Russia</option>
                                    <option value="Rwanda">Rwanda</option>
                                    <option value="St Barthelemy">St Barthelemy</option>
                                    <option value="St Eustatius">St Eustatius</option>
                                    <option value="St Helena">St Helena</option>
                                    <option value="St Kitts-Nevis">
                                    St Kitts-Nevis
                                    </option>
                                    <option value="St Lucia">St Lucia</option>
                                    <option value="St Maarten">St Maarten</option>
                                    <option value="St Pierre & Miquelon">
                                    St Pierre & Miquelon
                                    </option>
                                    <option value="St Vincent & Grenadines">
                                    St Vincent & Grenadines
                                    </option>
                                    <option value="Saipan">Saipan</option>
                                    <option value="Samoa">Samoa</option>
                                    <option value="Samoa American">
                                    Samoa American
                                    </option>
                                    <option value="San Marino">San Marino</option>
                                    <option value="Sao Tome & Principe">
                                    Sao Tome & Principe
                                    </option>
                                    <option value="Saudi Arabia">Saudi Arabia</option>
                                    <option value="Senegal">Senegal</option>
                                    <option value="Seychelles">Seychelles</option>
                                    <option value="Sierra Leone">Sierra Leone</option>
                                    <option value="Singapore">Singapore</option>
                                    <option value="Slovakia">Slovakia</option>
                                    <option value="Slovenia">Slovenia</option>
                                    <option value="Solomon Islands">
                                    Solomon Islands
                                    </option>
                                    <option value="Somalia">Somalia</option>
                                    <option value="South Africa">South Africa</option>
                                    <option value="Spain">Spain</option>
                                    <option value="Sri Lanka">Sri Lanka</option>
                                    <option value="Sudan">Sudan</option>
                                    <option value="Suriname">Suriname</option>
                                    <option value="Swaziland">Swaziland</option>
                                    <option value="Sweden">Sweden</option>
                                    <option value="Switzerland">Switzerland</option>
                                    <option value="Syria">Syria</option>
                                    <option value="Tahiti">Tahiti</option>
                                    <option value="Taiwan">Taiwan</option>
                                    <option value="Tajikistan">Tajikistan</option>
                                    <option value="Tanzania">Tanzania</option>
                                    <option value="Thailand">Thailand</option>
                                    <option value="Togo">Togo</option>
                                    <option value="Tokelau">Tokelau</option>
                                    <option value="Tonga">Tonga</option>
                                    <option value="Trinidad & Tobago">
                                    Trinidad & Tobago
                                    </option>
                                    <option value="Tunisia">Tunisia</option>
                                    <option value="Turkey">Turkey</option>
                                    <option value="Turkmenistan">Turkmenistan</option>
                                    <option value="Turks & Caicos Is">
                                    Turks & Caicos Is
                                    </option>
                                    <option value="Tuvalu">Tuvalu</option>
                                    <option value="Uganda">Uganda</option>
                                    <option value="United Kingdom">
                                    United Kingdom
                                    </option>
                                    <option value="Ukraine">Ukraine</option>
                                    <option value="United Arab Erimates">
                                    United Arab Emirates
                                    </option>
                                    <option value="United States of America">
                                    United States of America
                                    </option>
                                    <option value="Uraguay">Uruguay</option>
                                    <option value="Uzbekistan">Uzbekistan</option>
                                    <option value="Vanuatu">Vanuatu</option>
                                    <option value="Vatican City State">
                                    Vatican City State
                                    </option>
                                    <option value="Venezuela">Venezuela</option>
                                    <option value="Vietnam">Vietnam</option>
                                    <option value="Virgin Islands (Brit)">
                                    Virgin Islands (Brit)
                                    </option>
                                    <option value="Virgin Islands (USA)">
                                    Virgin Islands (USA)
                                    </option>
                                    <option value="Wake Island">Wake Island</option>
                                    <option value="Wallis & Futana Is">
                                    Wallis & Futana Is
                                    </option>
                                    <option value="Yemen">Yemen</option>
                                    <option value="Zaire">Zaire</option>
                                    <option value="Zambia">Zambia</option>
                                    <option value="Zimbabwe">Zimbabwe</option>
                                </select>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col sm className="col-md-4">
                                <p className="help-block text-danger">
                                    {errors.zipCode}
                                </p>
                            </Col>
                        </Form.Row>
 
                        <br></br>
                        <div className="form-header-container mb-4">
                            <h4 className="form-header-text">Date and time format</h4>
                        </div>
                        <Row >
                        <Col className="col-md-5">
                            <Form.Group controlId="Date">
                            <Form.Label>Date format</Form.Label>
                            <select
                                defaultValue={this.state.userData.account.dateFormat}
                                name="dateFormate"
                                onChange={HandleChange}
                            >
                                <option>DD/MM/YYYY</option>
                                <option>MM/DD/YYYY</option>
                            </select>
                            </Form.Group>
                        </Col>
                        </Row>
                        
                        <Row>
                        <Col className="col-md-5">
                            <Form.Group controlId="time">
                                <Form.Label>Time format</Form.Label>
                                <select
                                defaultValue={this.state.userData.account.timeFormat}
                                name="timeFormat"
                                onChange={HandleChange}
                                >
                                    <option>HH:SS PM</option>
                                    <option>HH:SS pm</option>
                                    <option>HH:SS</option>
                                </select>
                            </Form.Group>
                        </Col>
                        </Row>
                        <br></br>
                        <div className="form-header-container mb-4">
                            <h4 className="form-header-text">Additional information</h4>
                        </div>
                        <Row >
                        <Col className="col-md-5">
                            <Form.Group controlId="Currency Format">
                                <Form.Label>Currency Format</Form.Label>
                                {/* <Form.Control type="text" defaultValue={this.state.userData.account.currencyFormat} name="currencyFormat" placeholder="Currency Format" onChange={HandleChange} /> */}
                                <select
                            name="currencyFormat"
                            id={1}
                            value={this.state.userData.account.currencyFormat} 
                            onChange={HandleCurrencyChange}
                            style={{ "border-radius": "5px" }}
                          >
<option value="East Caribbean dollar">East Caribbean dollar</option>
<option value="Aruban florin">Aruban florin</option>
<option value="Bahamian dollar">Bahamian dollar</option>
<option value="Barbadian dollar">Barbadian dollar</option>
<option value="United States dollar">United States dollar</option>
<option value="Cayman Islands dollar">Cayman Islands dollar</option>
<option value="Cuban peso">Cuban peso</option>
<option value="Dominican peso">Dominican peso</option>
<option value="Euro">Euro</option>
<option value="Haitian gourde">Haitian gourde</option>
<option value="Jamaican dollar">Jamaican dollar</option>
<option value="Trinidad and Tobago dollar">Trinidad and Tobago dollar</option>
<option value="United States dollar">United States dollar</option>
<option value="Algerian dinar">Algerian dinar</option>	
<option value="Angolan kwanza">Angolan kwanza</option>
<option value="Botswana pula">Botswana pula</option>	
<option value="Burundian franc">Burundian franc</option>		
<option value="Cape Verdean escudo">Cape Verdean escudo</option>		
<option value="CFA franc">CFA franc</option> 	
<option value="Comorian franc">Comorian franc</option>	
<option value="Congolese franc">Congolese franc</option>		
<option value="Dalasi">Dalasi</option>	
<option value="Djiboutian franc">Djiboutian franc</option>	
<option value="Egyptian pound">Egyptian pound</option>	
<option value="Eritrean nakfa">Eritrean nakfa</option>		
<option value="Ethiopian birr">Ethiopian birr</option>		
<option value="Ghanaian cedi">Ghanaian cedi</option>	
<option value="Guinean franc">Guinean franc</option>		
<option value="Kenyan shilling">Kenyan shilling</option>		
<option value="Lesotho loti">Lesotho loti</option>	
<option value="Liberian dollar">Liberian dollar</option>		
<option value="Libyan dinar">Libyan dinar</option>		
<option value="Lilangeni">Lilangeni</option>	
<option value="Malagasy ariary">Malagasy ariary</option>		
<option value="Malawian kwacha">Malawian kwacha</option>		
<option value="Mauritian rupee">Mauritian rupee</option>		
<option value="Moroccan dirham">Moroccan dirham</option>		
<option value="Mozambican metical">Mozambican metical</option>		
<option value="Namibian dollar">Namibian dollar</option>	
<option value="Nigerian naira">Nigerian naira</option>		
<option value="Ouguiya">Ouguiya</option>	
<option value="Rwandan franc">Rwandan franc</option>
<option value="São Tomé and Príncipe dobra">São Tomé and Príncipe dobra</option>
<option value="Seychellois rupee">Seychellois rupee</option>	
<option value="Sierra Leonean leone">Sierra Leonean leone</option>	
<option value="Somali shilling">Somali shilling</option>	
<option value="South African rand">South African rand</option>	
<option value="South Sudanese pound">South Sudanese pound</option>	
<option value="Sudanese pound">Sudanese pound</option>	
<option value="Tanzanian shilling">Tanzanian shilling</option>		
<option value="Tunisian dinar">Tunisian dinar</option>	
<option value="Ugandan shilling">Ugandan shilling</option>	
<option value="Zambian kwacha">Zambian kwacha</option>	

                            </select>
                            </Form.Group>
                        </Col>
                            
                        </Row>
                    </Form>
                    <br></br>
                    <div style={{marginLeft : "1%"}}>
                     <Button onClick={handleSubmit} disabled={this.state.disable} varient = "success">SAVE NEW INFORMATION</Button>
                    </div>
              </TabPane>

              <TabPane tab="Payment Info" key="2">
                <Payment></Payment>
             </TabPane>
             <TabPane tab="Custom Fields" key="3">
                 <CustomFeilds></CustomFeilds>
             </TabPane>
        </Tabs>
       
      </Card>
    );
  }
}

const mapStateToProps = state => ({
    userId: state.user.token.user._id
  });
  
export default connect(mapStateToProps)(customFeilds)