// import React, { useState } from "react";
// import styled from "styled-components";
// import verticalEllipsis from "../assets/icon-vertical-ellipsis.svg";
// import DeleteBoardOrTask from "./deleteBoardOrTask";
// import EditBoard from "./editBoard";
// import EditTask from "./editTask";
// import { createPortal } from "react-dom";
// // The drop down is also used in the edit task card, although the position is a bit different. So I therefore exported the styles
// export const EllipsisDropDown = styled.div`
//   position: absolute;
//   top: 4rem;
//   right: 3rem;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   padding: 1rem;
//   background: var(--primary);
//   width: 12rem;
//   height: 5.875rem;
//   border-radius: 0.5rem;
//   box-shadow: 0px 4px 6px 0px rgba(54, 78, 126, 0.1);
//   h3 {
//     font-size: 0.8125rem;
//     font-weight: 500;
//     line-height: 1.4375rem;
//     &:first-child {
//       color: var(--Medium-Grey, #828fa3);
//     }
//     &:last-child {
//       color: var(--Red);
//     }
//   }
// `;

// export default function ({ editType, setIsViewTask }) {
//   console.log("edit drop button");

//   const [showDropDown, setShowDropDown] = useState(false);
//   //   delete
//   const [isDelete, setIsDelete] = useState(false);
//   const [isEdit, setIsEdit] = useState(true);

//   function handleEdit() {
//     setIsEdit((prev) => true);
//     setShowDropDown((prev) => !prev);

//     setIsViewTask(false);
//   }
//   function handleDelete() {
//     setIsDelete((prev) => true);
//     setShowDropDown((prev) => !prev);

//     setIsViewTask(false);
//   }
//
//       {showDropDown && (
//         <EllipsisDropDown>
//           <h3 onClick={handleEdit}>Edit {editType}</h3>
//           <h3 onClick={handleDelete}>Delete {editType}</h3>
//         </EllipsisDropDown>
//       )}
//       {isDelete && (
//         <DeleteBoardOrTask setIsDelete={setIsDelete} editType={editType} />
//       )}
//       {isEdit && (
//         <>
//           {editType == "Board" ? (
//             <EditBoard setIsEdit={setIsEdit} />
//           ) : (
//             <EditTask setIsEdit={setIsEdit} />
//           )}
//         </>
//       )}
//     </>
//   );
// }
// //
