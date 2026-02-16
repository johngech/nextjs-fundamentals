"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import LoadingIndicator from "../components/LoadingIndicator";
// import HeavyComponent from "../components/HeavyComponent";

// Lazy load client component
const HeavyComponent = dynamic(() => import("../components/HeavyComponent"), {
  loading: () => <LoadingIndicator />,
  ssr: false,
});

const HeavyPage = () => {
  const [isVisible, setVisible] = useState(false);
  const [users, setUsers] = useState([
    { id: 1, name: "a" },
    { id: 2, name: "c" },
    { id: 3, name: "b" },
  ]);
  return (
    <div className="container">
      <button
        onClick={async () => setVisible(!isVisible)}
        className="btn btn-primary"
      >
        Show
      </button>
      <div className="mt-3">{isVisible && <HeavyComponent />}</div>
      <div>
        <button
          className="btn btn-secondary"
          onClick={async () => {
            // lazy load 3rd party library
            const _ = (await import("lodash")).default;
            const sorted = _.sortBy(users, "name");
            setUsers(sorted);
          }}
        >
          Sort
        </button>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HeavyPage;
