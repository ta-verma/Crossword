// import { Link } from "react-router-dom";
import { FacebookIcon } from "react-share";
import { LinkedinIcon } from "react-share";

export default function AboutUs() {
    return (
        <div className="container">
            <div className="heading-title text-center">
                <h2 className="text-uppercase">Teams </h2>
                <h3 className="p-top-30 half-txt">This project is developed under <a target="_blank" rel="noreferrer" href="https://avishkar.mnnit.ac.in/">Avishkar</a></h3>
            </div>
            <div className="row">
                <div className="col-4">
                    <div className="team-member">
                        <div className="team-img">
                            <img src="https://cdn-icons-png.flaticon.com/512/0/93.png" alt="team member" width='400px' height='400px' className="img-responsive" />
                        </div>
                        <div className="team-hover">
                            <div className="desk">
                                <h4>MCA 2nd year !</h4>
                                <p>Motilal Nehru National Institute of Technology, Allahabad</p>
                            </div>
                            <div className="s-link">
                                <a target="_blank" rel="noreferrer" href="https://facebook.com"><FacebookIcon size={32} round /></a>
                                <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/ta-verma/"><LinkedinIcon size={32} round /></a>
                            </div>
                        </div>
                    </div>
                    <div className="team-title">
                        <h5>Tarun Verma</h5>
                    </div>
                </div>
                <div className="col-4">
                    <div className="team-member">
                        <div className="team-img">
                            <img src="https://cdn-icons-png.flaticon.com/512/0/93.png" width='400px' height='400px' alt="team member" className="img-responsive" />
                        </div>
                        <div className="team-hover">
                            <div className="desk">
                                <h4>MCA 2nd year !</h4>
                                <p>Motilal Nehru National Institute of Technology, Allahabad</p>
                            </div>
                            <div className="s-link">
                                <a target="_blank" rel="noreferrer" href="https://facebook.com"><FacebookIcon size={32} round /></a>
                                <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/deepakkush01/"><LinkedinIcon size={32} round /></a>
                            </div>
                        </div>
                        <div className="team-title">
                            <h5>Deepak Singh Kushwaha</h5>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="team-member">
                        <div className="team-img">
                            <img src="https://cdn-icons-png.flaticon.com/512/0/93.png"  width='400px' height='400px' alt="team member" className="img-responsive" />
                        </div>
                        <div className="team-hover">
                            <div className="desk">
                                <h4>MCA 2nd year !</h4>
                                <p>Motilal Nehru National Institute of Technology, Allahabad</p>
                            </div>
                            <div className="s-link">
                                <a target="_blank" rel="noreferrer" href="https://facebook.com"><FacebookIcon size={32} round /></a>
                                <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/shreya-gupta-132632191/"><LinkedinIcon size={32} round /></a>
                            </div>
                        </div>
                    </div>
                    <div className="team-title">
                        <h5>Shreya Gupta</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}