import React from "react";
import "../Assets/IndividualCourse.css";
import Header from "../Routes/Header";
import Footer from "../Routes/Footer";


function IndividualCourse() {
    return (
        <div className="IndividualCourse">
            <Header />
            <div className="course_individual_data">

                <img src={`../Image/machinelearning.jpg`} alt="" />
                <h1>Course Name</h1>
                <h3>Creator Name</h3>

                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo, deleniti? Sint ipsam inventore ea quisquam repellendus tempore, fugit, deserunt, vel expedita maxime at. Id facilis fugiat aperiam quam quos illo possimus accusantium sit repudiandae consectetur rerum dolores provident sed corporis ut velit voluptates ipsum aut soluta adipisci excepturi, amet aspernatur. Ipsa illum soluta aut culpa nobis odio consequatur voluptate, aspernatur vel! Eligendi facere, eaque excepturi est aliquid dolore, qui necessitatibus consequuntur blanditiis omnis voluptates possimus deserunt iusto quam! Eum voluptatibus ipsa delectus dolore sit obcaecati amet enim deleniti, doloribus id quis aut eius iure sunt veritatis, quo fugiat omnis tenetur? Temporibus necessitatibus aliquam ab, facilis, architecto animi impedit explicabo quam aliquid repellendus laboriosam voluptatibus fugiat ut deserunt optio? Distinctio voluptates eum, vel id consequuntur neque dicta tempora fugit repudiandae itaque sapiente facilis nulla quod mollitia quia voluptatem. Saepe, aspernatur eveniet ipsum, exercitationem dicta perferendis incidunt quaerat quasi possimus reiciendis minima.</p>

                <h2><u>Video Links</u></h2>

                <ul>
                    <li>Link1
                        <button className="complete-button">Complete</button></li>
                    <li >Link2 <button className="complete-button">Complete</button></li>
                    <li>Link3 <button className="complete-button">Complete</button></li>
                </ul>
            </div>
            <Footer />
        </div>


    )
}

export default IndividualCourse;