// import { Link } from "react-router-dom";

// const TattooCard: React.FC<{ tattoo: Tattoo }> = ({ tattoo }) => {
//   return (
//     <Link to={`/tattoo/${tattoo._id}`}>
//       <div className="bg-white shadow-md rounded-lg p-4 mb-4 dark:bg-gray-800 dark:text-white hover:shadow-lg transition">
//         <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
//           {typeof tattoo.image === "string" ? (
//             <img
//               src={tattoo.image}
//               alt={tattoo.title}
//               className="h-full w-full object-cover"
//             />
//           ) : (
//             <span className="text-gray-400">No Image</span>
//           )}
//         </div>
//         <h3 className="text-xl font-bold mt-4">{tattoo.title}</h3>
//         <p className="text-gray-600 dark:text-gray-300">Artist: {tattoo.artist}</p>
//         <p className="text-gray-600 dark:text-gray-300">Date: {tattoo.date}</p>
//         <p className="text-gray-600 dark:text-gray-300">Style: {tattoo.style}</p>
//         <p className="text-gray-600 dark:text-gray-300">Size: {tattoo.size}</p>
//         <p className="text-gray-600 dark:text-gray-300">Code: {tattoo.uniqueCode}</p>
//         <p className="text-blue-600 font-semibold dark:text-blue-400">₹{tattoo.price}</p>
//       </div>
//     </Link>
//   );
// };

// export default TattooCard;
