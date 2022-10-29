import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PrincipalHeader from '../components/layout/principal_header'
import Home from '../containers/home'
import NotFound from '../containers/not_found'
import PracticeExams from '../containers/practiceExams'
import TestPracticeMenu from '../components/test_practice/menu'
import QuestionProvider from '../components/context/question'

export default function PrincipalRouter() {
    return (
        <Router>
            <QuestionProvider>
                <PrincipalHeader>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/practice-exam" element={<TestPracticeMenu />} />
                        <Route path="/practice-exam/:formType/:id" element={<PracticeExams />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </PrincipalHeader>
            </QuestionProvider>
        </Router>
    )
}
