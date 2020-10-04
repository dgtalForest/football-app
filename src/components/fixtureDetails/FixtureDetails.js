import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../axios/axios'
import HeadToHead from '../headtoHead/Head2Head';

import LineUps from '../lineUps/LineUps';
import Prediction from '../prediction/Prediction';
import Stats from '../stats/Stats';
import './fixtureDetails.scss'
const FixtureDetails = () => {

    const { fixture_id } = useParams()

    const [fixtureDetails, setFixtureDetails] = useState('');
    const [component, setComponent] = useState('prediction')

    useEffect(() => {
        const callback = data => setFixtureDetails(data.fixtures[0])
        api(`fixtures/id/${fixture_id}`, callback)
    }, [fixture_id])

    if (fixtureDetails) {
        var teamName = fixtureDetails["homeTeam"].team_name
        var homeTeamLineup = fixtureDetails.lineups[teamName]

        teamName = fixtureDetails["awayTeam"].team_name
        var awayTeamLineup = fixtureDetails.lineups[teamName]

    }
    return (
        <div className="fixtureDetails col-md-8">
            Fixture Details {fixture_id}
            <div className="fixtureDetails__time">
                <img src={fixtureDetails?.league?.logo} alt="" />
                <p>{fixtureDetails?.venue}</p>
                <p>{new Date(fixtureDetails.event_date).toDateString()}</p>
            </div>
            <div className="fixtureDetails__top">
                <img src={fixtureDetails.homeTeam?.logo} alt="" className="team__logo-small" />
                <div className="fixtureDetails__score">
                    {fixtureDetails.goalsHomeTeam} - {fixtureDetails.goalsAwayTeam}
                </div>
                <img src={fixtureDetails.awayTeam?.logo} alt="" className="team__logo-small" />
            </div>
            <div className="fixture__navbar">
                <div className="fixture__nav" onClick={() => setComponent('h2h')}>h2h</div>
                <div className="fixture__nav" onClick={() => setComponent('stats')}>Stats</div>
                <div className="fixture__nav" onClick={() => setComponent('prediction')}>Prediction</div>
                <div className="fixture__nav" onClick={() => setComponent('lineup')}>Lineups</div>
            </div>
            {component === 'h2h' &&
                <HeadToHead homeTeam={fixtureDetails.homeTeam} awayTeam={fixtureDetails.awayTeam} />
            }
            {
                component === 'prediction' &&
                <Prediction fixture_id={fixture_id} />
            }
            {
                component === 'stats' &&
                fixtureDetails.statistics &&
                <Stats stats={fixtureDetails.statistics} />
            }
            {
                component === 'lineup' &&
                <LineUps homeTeam={fixtureDetails.homeTeam} awayTeam={fixtureDetails.awayTeam} homeTeamLineup={homeTeamLineup} awayTeamLineup={awayTeamLineup} />
            }

        </div >
    );
};

export default FixtureDetails;