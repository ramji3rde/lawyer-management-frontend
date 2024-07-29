// import React, { PropsWithChildren } from 'react';
// import { Collapse } from 'antd';
// import Minus from 'app/assets/icons/MinusIcon.svg';
// import Plus from 'app/assets/icons/PlusIcon.svg';

// const { Panel } = Collapse;

// interface IComponentState {
//   open: boolean;
// }

// type AllProps = PropsWithChildren<IComponentProps>;

// export class Antd extends React.Component<AllProps, IComponentState> {
//   state = {
//     open: false
//   };

//   render() {
//     const { open } = this.state;
//     return (
//       <Collapse
//         className="custom-collapse"
//         bordered={false}
//         onChange={this.onChange}
//         expandIcon={() => (open ? <img src={Minus} alt="close-info" /> : <img src={Plus} alt="open-info" />)}
//       >
//         <Panel
//           header={
//             open ? (
//               <div className="application-info__icon-text">Open</div>
//             ) : (
//               <div className="application-info__icon-text">Close</div>
//             )
//           }
//           key="1"
//         >
//           {this.props.children}
//         </Panel>
//       </Collapse>
//     );
//   }

//   onChange = () => {
//     this.setState(prevState => ({
//       open: !prevState.open
//     }));
//   };
// }
// export default Antd;