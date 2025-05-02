'use client';

import { useState } from 'react';
import type { Character } from '@/lib/characters';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Common attributes to display in the form
const commonAttributes = [
  { id: 'isMale', label: 'Is male?' },
  { id: 'isFictional', label: 'Is fictional?' },
  { id: 'isFromMovie', label: 'Is from a movie?' },
  { id: 'isSuperhero', label: 'Is a superhero?' },
  { id: 'hasSuperpowers', label: 'Has superpowers?' },
  { id: 'isVillain', label: 'Is a villain?' },
  { id: 'isDisney', label: 'Is associated with Disney?' },
  { id: 'isHuman', label: 'Is human?' },
  { id: 'isFromBook', label: 'Is from a book?' },
  { id: 'hasSidekick', label: 'Has a sidekick?' },
  { id: 'isFromTVShow', label: 'Is from a TV show?' },
  { id: 'isAnimated', label: 'Is animated?' },
  { id: 'canFly', label: 'Can fly?' },
  { id: 'isFunny', label: 'Is known for being funny?' },
  { id: 'hasMagic', label: 'Has magic?' },
  { id: 'isHistorical', label: 'Is a historical figure?' },
  { id: 'isAlive', label: 'Is alive?' },
  { id: 'isAmerican', label: 'Is American?' },
  { id: 'isOlderThan50', label: 'Is older than 50 years?' },
  { id: 'wearsDistinctiveCostume', label: 'Wears a distinctive costume?' },
];

// Additional category attributes
const categoryAttributes = [
  { id: 'isFromGame', label: 'Is from a game?' },
  { id: 'isFromVideoGame', label: 'Is from a video game?' },
  { id: 'isSportsRelated', label: 'Is sports related?' },
  { id: 'isMusician', label: 'Is a musician?' },
  { id: 'isPolitician', label: 'Is a politician?' },
  { id: 'isScientist', label: 'Is a scientist?' },
  { id: 'isFromAnime', label: 'Is from an anime?' },
];

export default function ContributePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [character, setCharacter] = useState<Partial<Character>>({
    name: '',
    description: '',
    image: '/characters/placeholder.jpg',
    attributes: {},
    userContributed: true,
    contributedBy: '',
    dateAdded: new Date().toISOString(),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCharacter(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (attributeId: string, checked: boolean) => {
    setCharacter(prev => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [attributeId]: checked
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    // Validation
    if (!character.name || !character.description) {
      setSubmitError('Please fill in the name and description.');
      setIsSubmitting(false);
      return;
    }

    try {
      // In a real app, we would send this data to a server API
      // For this demo, we'll simulate success after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Character submitted:', character);

      // Show success message
      setSubmitSuccess(true);

      // Reset the form
      setCharacter({
        name: '',
        description: '',
        image: '/characters/placeholder.jpg',
        attributes: {},
        userContributed: true,
        contributedBy: '',
        dateAdded: new Date().toISOString(),
      });

      // In a real app, we would wait for confirmation then redirect
      setTimeout(() => {
        router.push('/');
      }, 2000);

    } catch (error) {
      console.error('Error submitting character:', error);
      setSubmitError('Failed to submit the character. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 flex flex-col items-center p-4">
      <div className="max-w-2xl w-full mt-8">
        <Card className="shadow-lg border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-600 dark:text-blue-400">Contribute a Character</CardTitle>
            <CardDescription>Add a new character to the Akinator database</CardDescription>
          </CardHeader>

          {submitSuccess ? (
            <CardContent className="p-6 text-center">
              <div className="text-green-600 font-bold text-xl mb-4">Character submitted successfully!</div>
              <p className="mb-4">Thank you for contributing to the Akinator character database.</p>
              <p>Redirecting to home page...</p>
            </CardContent>
          ) : (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Character Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g., Luke Skywalker"
                    value={character.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="A brief description of the character"
                    value={character.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contributedBy">Your Name (Optional)</Label>
                  <Input
                    id="contributedBy"
                    name="contributedBy"
                    placeholder="Who should we credit for this contribution?"
                    value={character.contributedBy}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="border-t pt-4">
                  <Label className="text-lg font-semibold mb-4 block">Character Attributes</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Check all attributes that apply to this character. Be as accurate as possible.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                    {commonAttributes.map((attr) => (
                      <div key={attr.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={attr.id}
                          checked={!!character.attributes?.[attr.id]}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(attr.id, checked === true)
                          }
                        />
                        <Label
                          htmlFor={attr.id}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {attr.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <Label className="text-lg font-semibold mb-4 block">Category Attributes</Label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                    {categoryAttributes.map((attr) => (
                      <div key={attr.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={attr.id}
                          checked={!!character.attributes?.[attr.id]}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(attr.id, checked === true)
                          }
                        />
                        <Label
                          htmlFor={attr.id}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {attr.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {submitError && (
                  <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-3 rounded">
                    {submitError}
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex justify-between">
                <Link href="/">
                  <Button variant="outline" type="button">Cancel</Button>
                </Link>
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Character'}
                </Button>
              </CardFooter>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
