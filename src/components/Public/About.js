// import { Link } from "react-router-dom";
import { FacebookIcon } from "react-share";
import { LinkedinIcon } from "react-share";

export default function AboutUs() {
    return (
        <div class="container">
            <div class="row">
                <div class="heading-title text-center">
                    <h2 class="text-uppercase">Teams </h2>
                    <h3 class="p-top-30 half-txt">This project is developed under <a target="_blank" rel="noreferrer" href="https://avishkar.mnnit.ac.in/">Avishkar</a></h3>
                </div>

                <div class="col-md-4 col-sm-4">
                    <div class="team-member">
                        <div class="team-img">
                            <img src="https://cdn-icons-png.flaticon.com/512/0/93.png" alt="team member" class="img-responsive" />
                        </div>
                        <div class="team-hover">
                            <div class="desk">
                                <h4>MCA 2nd year !</h4>
                                <p>Motilal Nehru National Institute of Technology, Allahabad</p>
                            </div>
                            <div class="s-link">
                                <a target="_blank" rel="noreferrer" href="https://facebook.com"><FacebookIcon size={32} round /></a>
                                <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/ta-verma/"><LinkedinIcon size={32} round /></a>
                            </div>
                        </div>
                    </div>
                    <div class="team-title">
                        <h5>Tarun Verma</h5>
                    </div>
                </div>
                <div class="col-md-4 col-sm-4">
                    <div class="team-member">
                        <div class="team-img">
                            <img src="https://cdn-icons-png.flaticon.com/512/0/93.png" alt="team member" class="img-responsive" />
                        </div>
                        <div class="team-hover">
                            <div class="desk">
                                <h4>MCA 2nd year !</h4>
                                <p>Motilal Nehru National Institute of Technology, Allahabad</p>
                            </div>
                            <div class="s-link">
                                <a target="_blank" rel="noreferrer" href="https://facebook.com"><FacebookIcon size={32} round /></a>
                                <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/deepakkush01/"><LinkedinIcon size={32} round /></a>
                            </div>
                        </div>
                        <div class="team-title">
                            <h5>Deepak Singh Kushwaha</h5>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                        <div class="team-member">
                            <div class="team-img">
                                <img src="https://cdn-icons-png.flaticon.com/512/0/93.png" alt="team member" class="img-responsive" />
                            </div>
                            <div class="team-hover">
                                <div class="desk">
                                    <h4>MCA 2nd year !</h4>
                                    <p>Motilal Nehru National Institute of Technology, Allahabad</p>
                                </div>
                                <div class="s-link">
                                    <a target="_blank" rel="noreferrer" href="https://facebook.com"><FacebookIcon size={32} round /></a>
                                    <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/shreya-gupta-132632191/"><LinkedinIcon size={32} round /></a>
                                </div>
                            </div>
                        </div>
                        <div class="team-title">
                            <h5>Shreya Gupta</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}