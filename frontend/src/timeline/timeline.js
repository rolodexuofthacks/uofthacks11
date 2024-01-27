import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "./timeline.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChampagneGlasses,
  faHandshake,
  faMugHot,
  faGift,
  faHeadphones,
  faCamera,
  faPlane,
} from "@fortawesome/free-solid-svg-icons";
export default function Timeline() {
  return (
    <div className="timeline">
      <VerticalTimeline>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "#FFD28E" }}
          date="27th February, 2024"
          iconStyle={{ background: "#FFD28E", color: "#000" }}
          icon={<FontAwesomeIcon icon={faChampagneGlasses} />}
        >
          <h3 className="vertical-timeline-element-title">UofTHacks 11</h3>
          <h4 className="vertical-timeline-element-subtitle">
            Toronto, Ontario, Canada
          </h4>
          <p>
            Summary:
            <br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam.
          </p>
          <p>
            Notes:
            <br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "#EFA1C8" }}
          date="December 15th, 2023"
          iconStyle={{ background: "#EFA1C8", color: "#000" }}
          icon={<FontAwesomeIcon icon={faCamera} />}
        >
          <h3 className="vertical-timeline-element-title">Christmas Market</h3>
          <h4 className="vertical-timeline-element-subtitle">
            Quebec City, Quebec, Canada
          </h4>
          <p>
            Summary:
            <br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam.
          </p>
          <p>
            Notes:
            <br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "#CAB2FB" }}
          date="October 10th, 2023"
          iconStyle={{ background: "#CAB2FB", color: "#000" }}
          icon={<FontAwesomeIcon icon={faHeadphones} />}
        >
          <h3 className="vertical-timeline-element-title">Fall Foliage Tour</h3>
          <h4 className="vertical-timeline-element-subtitle">
            Algonquin Provincial Park, Ontario, Canada
          </h4>
          <p>
            Summary:
            <br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam.
          </p>
          <p>
            Notes:
            <br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "#D3FFB2" }}
          date="September 15th, 2023"
          iconStyle={{ background: "#D3FFB2", color: "#000" }}
          icon={<FontAwesomeIcon icon={faPlane} />}
        >
          <h3 className="vertical-timeline-element-title">
            Toronto International Film Festival (TIFF)
          </h3>
          <h4 className="vertical-timeline-element-subtitle">
            Toronto, Ontario, Canada
          </h4>
          <p>
            Summary:
            <br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam.
          </p>
          <p>
            Notes:
            <br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "#E1EBFF" }}
          date="July 1st, 2023"
          iconStyle={{ background: "#E1EBFF", color: "#000" }}
          icon={<FontAwesomeIcon icon={faGift} />}
        >
          <h3 className="vertical-timeline-element-title">
            Canada Day Celebration
          </h3>
          <h4 className="vertical-timeline-element-subtitle">
            Parliament Hill, Ottawa, Ontario, Canada
          </h4>
          <p>
            Summary:
            <br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam.
          </p>
          <p>
            Notes:
            <br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam.
          </p>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "#E3A1E3" }}
          date="March 7th, 2023"
          iconStyle={{ background: "#E3A1E3", color: "#000" }}
          icon={<FontAwesomeIcon icon={faHandshake} />}
        >
          <h3 className="vertical-timeline-element-title">
            Northern Lights Viewing
          </h3>
          <h4 className="vertical-timeline-element-subtitle">
            Yellowknife, Northwest Territories, Canada
          </h4>
          <p>
            Summary:
            <br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam.
          </p>
          <p>
            Notes:
            <br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam.
          </p>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </div>
  );
}
