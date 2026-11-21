import React from 'react';
import {Composition} from 'remotion';
import {Hut} from './Hut';
import {Hotel} from './Hotel';
import {HutEN} from './HutEN';
import {HotelEN} from './HotelEN';
import {Fluss} from './Fluss';
import {FlussEN} from './FlussEN';
export const Root: React.FC = () => <><Composition id="Hut" component={Hut} durationInFrames={2880} fps={30} width={1080} height={1920} /><Composition id="Hotel" component={Hotel} durationInFrames={2880} fps={30} width={1080} height={1920} /><Composition id="HutEN" component={HutEN} durationInFrames={2609} fps={30} width={1080} height={1920} /><Composition id="HotelEN" component={HotelEN} durationInFrames={2712} fps={30} width={1080} height={1920} /><Composition id="Fluss" component={Fluss} durationInFrames={2941} fps={30} width={1080} height={1920} /><Composition id="FlussEN" component={FlussEN} durationInFrames={2618} fps={30} width={1080} height={1920} /></>;
